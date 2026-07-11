import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Database, AlertCircle, RefreshCw, Loader2, LogOut } from "lucide-react";
import { api, type Message } from "@/lib/api.ts";
import { useAuth } from "@/hooks/useAuth.ts";
import { MessageBubble } from "./_components/message-bubble.tsx";
import { ChatInput } from "./_components/chat-input.tsx";
import { SUGGESTED_QUESTIONS, RFP_SUGGESTED_QUESTIONS } from "./_components/suggested-questions.ts";

type LocalMessage = Message | { id: string; role: "assistant"; content: string; isStreaming: true; created_at: string };

export default function ChatPage() {
  const { user, signOut } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<"chat" | "rfp">("chat");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<LocalMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: kbStatus, refetch: refetchKbStatus } = useQuery({
    queryKey: ["kb-status"],
    queryFn: api.kbStatus,
    refetchInterval: 30_000,
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const questions = mode === "rfp" ? RFP_SUGGESTED_QUESTIONS : SUGGESTED_QUESTIONS;
  const isKbEmpty = kbStatus?.chunkCount === 0;
  const isKbLoading = kbStatus === undefined;

  const handleSend = async (question: string) => {
    setError(null);
    setIsLoading(true);

    const userMsg: Message = { id: `local-${Date.now()}`, role: "user", content: question, created_at: new Date().toISOString() };
    const streamingMsg: LocalMessage = { id: "streaming", role: "assistant", content: "", isStreaming: true, created_at: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg, streamingMsg]);

    try {
      let convId = conversationId;
      if (!convId) {
        const conversation = await api.createConversation(question.slice(0, 60), mode);
        convId = conversation.id;
        setConversationId(convId);
      }

      const result = await api.sendMessage(convId, question, mode);
      const assistantMsg: Message = {
        id: result.messageId,
        role: "assistant",
        content: result.answer,
        sources: result.sources,
        web_results: result.webResults,
        flags: result.flags,
        routed_to: result.routedTo,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev.slice(0, -1), assistantMsg]);
    } catch (err) {
      setMessages((prev) => prev.slice(0, -1));
      setError(err instanceof Error ? err.message : "Failed to get response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = async (messageId: string, feedback: "up" | "down") => {
    setMessages((prev) => prev.map((m) => (m.id === messageId ? { ...m, feedback } : m)));
    try {
      await api.submitFeedback(messageId, feedback);
    } catch {
      // non-critical, feedback UI already updated optimistically
    }
  };

  const handleIngest = async () => {
    setError(null);
    try {
      const result = await api.ingest();
      if (result.errors.length > 0) {
        setError(`Indexed ${result.total} chunks across ${result.filesIngested} files, ${result.errors.length} file(s) failed.`);
      }
      refetchKbStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to index knowledge base");
    }
  };

  const showWelcome = messages.length === 0;

  return (
    <div className="flex h-screen flex-col bg-[var(--background)]">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--border)] bg-[var(--card)]/80 px-4 py-3 backdrop-blur-sm md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">d.</div>
          <div>
            <h1 className="text-sm font-semibold">d.engage AI Assistant</h1>
            <p className="hidden text-xs text-[var(--muted-foreground)] sm:block">{user?.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-[var(--border)] p-0.5 text-xs">
            <button
              onClick={() => setMode("chat")}
              className={`rounded px-2 py-1 ${mode === "chat" ? "bg-primary text-white" : "text-[var(--muted-foreground)]"}`}
            >
              Chat
            </button>
            <button
              onClick={() => setMode("rfp")}
              className={`rounded px-2 py-1 ${mode === "rfp" ? "bg-primary text-white" : "text-[var(--muted-foreground)]"}`}
            >
              RFP
            </button>
          </div>
          {!isKbLoading && (
            <div className="hidden items-center gap-1.5 text-xs text-[var(--muted-foreground)] sm:flex">
              <Database className="h-3.5 w-3.5" />
              <span>{isKbEmpty ? "KB not indexed" : `${kbStatus?.chunkCount} chunks indexed`}</span>
            </div>
          )}
          {!isKbLoading && (
            <button onClick={handleIngest} className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-2 py-1 text-xs">
              <RefreshCw className="h-3 w-3" />
              {isKbEmpty ? "Index KB" : "Re-index"}
            </button>
          )}
          <button onClick={() => signOut()} title="Sign out" className="rounded-lg p-1.5 text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      {isKbEmpty && !isKbLoading && (
        <div className="flex items-center gap-2 border-b border-yellow-200 bg-yellow-50 px-4 py-2 text-xs text-yellow-800 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
          <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
          <span>The knowledge base is not yet indexed. Click "Index KB" above (admin access required).</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 border-b border-red-200 bg-red-50 px-4 py-2 text-xs text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
          <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-6">
          {showWelcome && (
            <div className="pb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <span className="text-2xl font-bold text-primary">d.</span>
              </div>
              <h2 className="mb-2 text-xl font-semibold">d.engage AI Assistant</h2>
              <p className="mx-auto mb-8 max-w-md text-sm text-[var(--muted-foreground)]">
                Ask any question about d.engage products, capabilities, security, case studies, or competitive positioning.
              </p>
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-2 text-left sm:grid-cols-2">
                {questions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q.text)}
                    disabled={isLoading}
                    className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 text-left transition-all hover:border-primary/40 hover:bg-primary/5"
                  >
                    <span className="mb-0.5 block text-xs font-medium text-primary">{q.category}</span>
                    <span className="text-xs leading-relaxed text-[var(--muted-foreground)]">{q.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) =>
            "isStreaming" in msg && msg.isStreaming ? (
              <div key={msg.id} className="mb-6 flex gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  d.
                </div>
                <div className="rounded-2xl rounded-tl-sm border border-[var(--border)] bg-[var(--card)] px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Searching knowledge base...
                  </div>
                </div>
              </div>
            ) : (
              <MessageBubble key={msg.id} message={msg as Message} onFeedback={handleFeedback} />
            ),
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl px-4 pb-4 pt-2">
        <ChatInput
          onSend={handleSend}
          isLoading={isLoading}
          disabled={isKbEmpty && !isKbLoading}
          placeholder={isKbEmpty && !isKbLoading ? "Index the knowledge base first..." : `Ask anything about d.engage (${mode} mode)...`}
        />
        <p className="mt-2 text-center text-xs text-[var(--muted-foreground)]">Answers are grounded in the d.engage knowledge base. Always verify before client use.</p>
      </div>
    </div>
  );
}
