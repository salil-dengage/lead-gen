import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { ConvexError } from "convex/values";
import { api } from "@/convex/_generated/api.js";
import type { Id } from "@/convex/_generated/dataModel.d.ts";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Database, AlertCircle, RefreshCw, Loader2, Globe } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button.tsx";
import { useSessionToken } from "@/hooks/use-session-token.ts";
import { MessageBubble } from "./_components/message-bubble.tsx";
import { ChatInput } from "./_components/chat-input.tsx";
import { SUGGESTED_QUESTIONS } from "./_components/suggested-questions.ts";

type Source = { sourceFile: string; sourceLabel: string; heading: string };
type WebResult = { title: string; snippet: string; url: string };
type LocalMessage = {
  id?: Id<"messages">;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  webResults?: WebResult[];
  feedback?: "up" | "down";
  isStreaming?: boolean;
};

export default function ChatPage() {
  const sessionToken = useSessionToken();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [conversationId, setConversationId] = useState<Id<"conversations"> | null>(null);
  const [localMessages, setLocalMessages] = useState<LocalMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const chunkCount = useQuery(api.kb.getChunkCount);
  const dbMessages = useQuery(api.conversations.getMessages, conversationId ? { conversationId } : "skip");

  const createConversation = useMutation(api.conversations.create);
  const addMessage = useMutation(api.conversations.addMessage);
  const updateTitle = useMutation(api.conversations.updateTitle);
  const ingestAll = useAction(api.kb_ingest.ingestAll);
  const askQuestion = useAction(api.chat.askQuestion);

  useEffect(() => {
    if (dbMessages && dbMessages.length > 0 && localMessages.length === 0) {
      setLocalMessages(dbMessages.map((m) => ({ id: m._id, role: m.role, content: m.content, sources: m.sources, feedback: m.feedback ?? undefined })));
    }
  }, [dbMessages, localMessages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages]);

  const handleSend = async (question: string) => {
    if (!sessionToken) return;

    let convId = conversationId;
    if (!convId) {
      convId = await createConversation({ title: question.slice(0, 60), mode: "chat", sessionToken });
      setConversationId(convId);
    }

    const userMsgId = await addMessage({ conversationId: convId, role: "user", content: question });
    const userLocal: LocalMessage = { id: userMsgId, role: "user", content: question };
    setLocalMessages((prev) => [...prev, userLocal, { role: "assistant", content: "", isStreaming: true }]);
    setIsLoading(true);

    try {
      const history = localMessages.map((m) => ({ role: m.role, content: m.content }));
      const { answer, sources, webResults } = await askQuestion({ question, mode: "chat", conversationHistory: history });

      const asstMsgId = await addMessage({ conversationId: convId, role: "assistant", content: answer, sources });
      setLocalMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { id: asstMsgId, role: "assistant", content: answer, sources, webResults, isStreaming: false };
        return updated;
      });

      if (localMessages.length === 0) {
        await updateTitle({ id: convId, title: question.slice(0, 60) });
      }
    } catch (err) {
      setLocalMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: "Sorry, I encountered an error generating a response. Please try again.", isStreaming: false };
        return updated;
      });
      toast.error("Failed to get response. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIngest = async () => {
    toast.info("Ingesting knowledge base from GitHub...");
    try {
      const result = await ingestAll({});
      toast.success(`Knowledge base ready! Indexed ${result.total} chunks.`);
    } catch (err) {
      let msg = "Unknown error";
      if (err instanceof ConvexError) { msg = typeof err.data === "string" ? err.data : JSON.stringify(err.data); }
      else if (err instanceof Error) { msg = err.message; }
      toast.error(msg, { duration: 10000 });
      console.error(err);
    }
  };

  const isKbEmpty = chunkCount === 0;
  const isKbLoading = chunkCount === undefined;
  const showWelcome = localMessages.length === 0;

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">d.</div>
          <div>
            <h1 className="text-sm font-semibold text-foreground">d.engage AI Assistant</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Sales & Pre-Sales Knowledge Base</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isKbLoading && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Database className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isKbEmpty ? "KB not indexed" : `${chunkCount} chunks indexed`}</span>
            </div>
          )}
          {!isKbLoading && (
            <Button size="sm" variant="secondary" onClick={handleIngest} className="h-7 text-xs gap-1.5">
              <RefreshCw className="w-3 h-3" />
              {isKbEmpty ? "Index KB" : "Re-index"}
            </Button>
          )}
        </div>
      </header>

      {isKbEmpty && !isKbLoading && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800 px-4 py-2 flex items-center gap-2 text-xs text-yellow-800 dark:text-yellow-300">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>The knowledge base is not yet indexed. Add <strong>GITHUB_TOKEN</strong> in <strong>Advanced &gt; Secrets</strong>, then click "Index KB" above.</span>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <AnimatePresence>
            {showWelcome && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: "easeOut" }} className="text-center pb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">d.</span>
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">d.engage AI Assistant</h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8">
                  Ask any question about d.engage products, capabilities, security, case studies, or competitive positioning.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto text-left">
                  {SUGGESTED_QUESTIONS.map((q, i) => (
                    <motion.button key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i, duration: 0.3, ease: "easeOut" }} onClick={() => handleSend(q.text)} disabled={isLoading} className="flex items-start gap-3 p-3 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all text-left group cursor-pointer">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors mt-0.5">
                        <q.icon className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-primary block mb-0.5">{q.category}</span>
                        <span className="text-xs text-muted-foreground leading-relaxed">{q.text}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {localMessages.map((msg, i) => (
            <MessageBubble key={msg.id ?? i} messageId={msg.id} role={msg.role} content={msg.content} sources={msg.sources} webResults={msg.webResults} feedback={msg.feedback} isStreaming={msg.isStreaming} />
          ))}

          {isLoading && localMessages[localMessages.length - 1]?.role === "assistant" && !localMessages[localMessages.length - 1]?.content && (
            <div className="flex gap-3 mb-6">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">d.</div>
              <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Searching knowledge base...
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="px-4 pb-4 pt-2 max-w-3xl mx-auto w-full">
        <ChatInput onSend={handleSend} isLoading={isLoading} disabled={isKbEmpty && !isKbLoading} placeholder={isKbEmpty && !isKbLoading ? "Index the knowledge base first..." : "Ask anything about d.engage..."} />
        <p className="text-center text-xs text-muted-foreground mt-2">Answers are grounded in the d.engage knowledge base. Always verify before client use.</p>
      </div>
    </div>
  );
}
