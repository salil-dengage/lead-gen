-- d.engage Pre-Sales Assistant: schema for Supabase Postgres
-- Run via `supabase db push` or paste into the Supabase SQL editor.

create extension if not exists pgcrypto;

-- Knowledge base chunks (ingested from GitHub markdown, table-aware chunking).
create table if not exists kb_chunks (
  id bigint generated always as identity primary key,
  source_file text not null,
  source_label text not null,
  heading text not null,
  content text not null,
  chunk_index int not null,
  is_table boolean not null default false,
  industry_tags text[] not null default '{}',
  geography_tags text[] not null default '{}',
  content_tsv tsvector generated always as (
    setweight(to_tsvector('english', coalesce(heading, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(content, '')), 'B')
  ) stored,
  created_at timestamptz not null default now()
);
create index if not exists kb_chunks_tsv_idx on kb_chunks using gin (content_tsv);
create index if not exists kb_chunks_source_idx on kb_chunks (source_file);

-- One row per ingested source file, tracks freshness.
create table if not exists kb_ingestion (
  source_file text primary key,
  source_label text not null,
  status text not null check (status in ('pending', 'done', 'error')),
  chunk_count int not null default 0,
  error text,
  updated_at timestamptz not null default now()
);

-- Conversations belong to an authenticated Supabase user (no more anonymous
-- localStorage session tokens).
create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  mode text not null check (mode in ('chat', 'rfp')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists conversations_user_idx on conversations (user_id);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations (id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  sources jsonb not null default '[]',
  web_results jsonb not null default '[]',
  -- routing + honesty-posture flags (CLAUDE.md Section 6)
  routed_to text[] not null default '{}',
  flags text[] not null default '{}',
  feedback text check (feedback in ('up', 'down')),
  created_at timestamptz not null default now()
);
create index if not exists messages_conversation_idx on messages (conversation_id);

-- Row Level Security: users only ever see their own conversations/messages.
-- The server uses the service-role key and bypasses RLS for admin views
-- (e.g. the down-voted-feedback report), everything client-facing goes
-- through the API, not direct Supabase access, so RLS here is defense in
-- depth rather than the primary gate.
alter table conversations enable row level security;
alter table messages enable row level security;

create policy "conversations_owner" on conversations
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "messages_owner" on messages
  for all using (
    exists (
      select 1 from conversations c
      where c.id = messages.conversation_id and c.user_id = auth.uid()
    )
  );

-- Full-text search with a relevance floor and industry/geography boosting.
-- Fixes: (a) old app had no relevance threshold, so irrelevant chunks always
-- filled the top-N and got shown as "Sources"; (b) old app had no
-- industry/geography-aware retrieval at all.
create or replace function search_kb_chunks(
  q text,
  match_limit int default 12,
  min_rank float default 0.02,
  boost_industry text[] default '{}',
  boost_geography text[] default '{}'
) returns table (
  id bigint,
  source_file text,
  source_label text,
  heading text,
  content text,
  chunk_index int,
  is_table boolean,
  rank float
) language sql stable as $$
  with scored as (
    select
      c.id, c.source_file, c.source_label, c.heading, c.content, c.chunk_index, c.is_table,
      ts_rank_cd(c.content_tsv, websearch_to_tsquery('english', q)) as base_rank,
      ts_rank_cd(c.content_tsv, websearch_to_tsquery('english', q))
        + case when c.industry_tags && boost_industry then 0.15 else 0 end
        + case when c.geography_tags && boost_geography then 0.10 else 0 end
        as rank
    from kb_chunks c
    where c.content_tsv @@ websearch_to_tsquery('english', q)
  )
  select id, source_file, source_label, heading, content, chunk_index, is_table, rank
  from scored
  where base_rank >= min_rank
  order by rank desc
  limit match_limit
$$;
