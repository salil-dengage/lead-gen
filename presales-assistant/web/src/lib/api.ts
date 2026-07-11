import { supabase } from "./supabaseClient.ts";

const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

async function authHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = {
    "Content-Type": "application/json",
    ...(await authHeaders()),
    ...(init?.headers ?? {}),
  };
  const res = await fetch(`${BASE_URL}${path}`, { ...init, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(body.error ?? `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export type Source = { sourceFile: string; sourceLabel: string; heading: string };
export type WebResult = { title: string; snippet: string; url: string };
export type Conversation = { id: string; title: string; mode: "chat" | "rfp"; created_at: string; updated_at: string };
export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  web_results?: WebResult[];
  flags?: string[];
  routed_to?: string[];
  feedback?: "up" | "down" | null;
  created_at: string;
};
export type ChatResponse = {
  messageId: string;
  answer: string;
  sources: Source[];
  webResults: WebResult[];
  flags: string[];
  routedTo: string[];
  retrievedCount: number;
  citedCount: number;
};
export type KbStatus = {
  chunkCount: number;
  ingestion: Array<{ source_file: string; source_label: string; status: string; chunk_count: number; updated_at: string; error?: string }>;
};

export const api = {
  kbStatus: () => request<KbStatus>("/kb/status"),
  ingest: () => request<{ total: number; filesIngested: number; errors: unknown[] }>("/ingest", { method: "POST" }),
  createConversation: (title: string, mode: "chat" | "rfp") =>
    request<Conversation>("/conversations", { method: "POST", body: JSON.stringify({ title, mode }) }),
  listConversations: () => request<Conversation[]>("/conversations"),
  getMessages: (conversationId: string) => request<Message[]>(`/conversations/${conversationId}/messages`),
  updateTitle: (conversationId: string, title: string) =>
    request<{ ok: true }>(`/conversations/${conversationId}/title`, { method: "PATCH", body: JSON.stringify({ title }) }),
  sendMessage: (conversationId: string, question: string, mode: "chat" | "rfp") =>
    request<ChatResponse>("/chat", { method: "POST", body: JSON.stringify({ conversationId, question, mode }) }),
  submitFeedback: (messageId: string, feedback: "up" | "down") =>
    request<{ ok: true }>(`/conversations/messages/${messageId}/feedback`, { method: "POST", body: JSON.stringify({ feedback }) }),
};
