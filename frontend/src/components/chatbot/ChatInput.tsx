"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

interface Props {
  onSend: (message: string) => void;
  disabled: boolean;
}

export default function ChatInput({
  onSend,
  disabled,
}: Props) {
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = message.trim();

    if (!value || disabled || value.length > 5000) {
      return;
    }

    onSend(value);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 border-t border-slate-200 bg-white p-3"
    >
      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" &&
            !event.shiftKey
          ) {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
          }
        }}
        placeholder="Ask me anything about SBSD..."
        maxLength={5000}
        rows={1}
        disabled={disabled}
        className="max-h-28 min-h-11 flex-1 resize-none rounded-xl border border-slate-200 px-3 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#18365B] focus:ring-2 focus:ring-[#18365B]/10 disabled:opacity-50"
      />

      <button
        type="submit"
        disabled={disabled || !message.trim()}
        aria-label="Send message"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#18365B] text-white transition hover:bg-[#102744] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Send size={17} />
      </button>
    </form>
  );
}