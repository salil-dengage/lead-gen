import { useRef, useState } from "react";
import { SendHorizontal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { cn } from "@/lib/utils.ts";

type ChatInputProps = {
  onSend: (text: string) => void;
  isLoading: boolean;
  placeholder?: string;
  disabled?: boolean;
};

export function ChatInput({ onSend, isLoading, placeholder, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  };

  return (
    <div className="flex items-end gap-2 bg-card border border-border rounded-xl p-2 shadow-sm">
      <Textarea ref={textareaRef} value={value} onChange={handleInput} onKeyDown={handleKeyDown} placeholder={placeholder ?? "Ask anything about d.engage..."} rows={1} disabled={disabled || isLoading} className={cn("flex-1 resize-none border-0 shadow-none focus-visible:ring-0 bg-transparent text-sm min-h-[36px] max-h-[200px] p-1.5")} />
      <Button size="sm" onClick={handleSend} disabled={!value.trim() || isLoading || disabled} className="flex-shrink-0 h-9 w-9 p-0 rounded-lg">
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <SendHorizontal className="w-4 h-4" />}
      </Button>
    </div>
  );
}
