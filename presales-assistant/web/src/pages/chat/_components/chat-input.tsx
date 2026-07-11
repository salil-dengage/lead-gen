import { useRef, useState } from "react";
import { SendHorizontal, Loader2 } from "lucide-react";

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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  };

  return (
    <div className="flex items-end gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-2 shadow-sm">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? "Ask anything about d.engage..."}
        rows={1}
        disabled={disabled || isLoading}
        className="max-h-[200px] min-h-[36px] flex-1 resize-none border-0 bg-transparent p-1.5 text-sm outline-none"
      />
      <button
        onClick={handleSend}
        disabled={!value.trim() || isLoading || disabled}
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-white disabled:opacity-40"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizontal className="h-4 w-4" />}
      </button>
    </div>
  );
}
