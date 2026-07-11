function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var ${name}. See server/.env.example.`);
  }
  return value;
}

export const env = {
  supabaseUrl: () => required("SUPABASE_URL"),
  supabaseServiceRoleKey: () => required("SUPABASE_SERVICE_ROLE_KEY"),
  anthropicApiKey: () => required("ANTHROPIC_API_KEY"),
  githubToken: () => required("GITHUB_TOKEN"),
  githubRepo: () => process.env.GITHUB_REPO ?? "salil-dengage/lead-gen",
  kbKnowledgeBasePath: () =>
    process.env.KB_KNOWLEDGE_BASE_PATH ?? "dengage-presales-claude-code/knowledge-base",
  kbInfosecPath: () => process.env.KB_INFOSEC_PATH ?? "dengage-presales-claude-code/infosec",
  serperApiKey: () => process.env.SERPER_API_KEY,
  adminEmails: () =>
    (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  port: () => Number(process.env.PORT ?? 8080),
};
