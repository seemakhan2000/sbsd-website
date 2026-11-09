"use client";

import {
  Bot,
  X,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

import { useEffect, useRef } from "react";

import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import SuggestedQuestions from "../chatbot/SuggestedQuestion";
import TypingIndicator from "./TypingIndicator";

import type {
  ChatMessageType,
} from "./chatbot.types";

interface Props {
  messages: ChatMessageType[];
  loading: boolean;
  onSendMessage: (message: string) => void;
  onClose: () => void;
  onReset: () => void;
}

export default function ChatbotWindow({
  messages,
  loading,
  onSendMessage,
  onClose,
  onReset,
}: Props) {
  // Auto-scroll reference
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Automatically show latest question and answer
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading]);

  return (
    /*
      Size is controlled by the parent wrapper (ChatbotWidget).
      This component just fills it: h-full w-full.
      Mobile  -> full screen sheet (no rounded corners)
      Desktop -> floating card (rounded + shadow)
    */
    <section
      role="dialog"
      aria-label="Virginia SBSD Virtual Assistant"
      className="
        flex h-full w-full flex-col overflow-hidden
        bg-white
        sm:rounded-2xl sm:border sm:border-slate-200 sm:shadow-2xl
      "
    >
      {/* Header */}
      <header
        className="
          flex shrink-0 items-center justify-between
          bg-[#142B49] px-4 py-3 text-white sm:py-4
          pt-[max(0.75rem,env(safe-area-inset-top))]
          sm:pt-4
        "
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
            <Bot size={23} />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold">
              Virginia SBSD Assistant
            </h2>

            <p className="mt-0.5 truncate text-xs text-blue-100">
              Business &amp; Loan Support
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={onReset}
            aria-label="Start new conversation"
            title="New conversation"
            className="rounded-lg p-2 transition hover:bg-white/10"
          >
            <RotateCcw size={17} />
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close chatbot"
            className="rounded-lg p-2 transition hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>
      </header>

      {/* Disclaimer */}
      <div className="flex shrink-0 items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2">
        <ShieldCheck size={15} className="shrink-0 text-emerald-600" />

        <p className="text-[11px] leading-snug text-slate-500">
          AI-powered information assistant. Verify important
          requirements with official SBSD resources.
        </p>
      </div>

      {/* Messages (only this area scrolls) */}
      <div
        className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain bg-white p-4"
        aria-live="polite"
      >
        {messages.length === 0 && (
          <>
            <div className="flex gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#18365B] text-white">
                <Bot size={17} />
              </div>

              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-100 p-4">
                <p className="text-sm font-semibold text-slate-800">
                  Welcome to Virginia SBSD!
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  I can help you explore business resources,
                  financing programs, certifications and
                  application information. How can I assist you?
                </p>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Suggested questions
              </p>

              <SuggestedQuestions onSelect={onSendMessage} />
            </div>
          </>
        )}

        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {loading && <TypingIndicator />}

        {/* Auto-scroll target */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input + footer (always visible at bottom) */}
      <div className="shrink-0">
        <ChatInput
          onSend={onSendMessage}
          disabled={loading}
        />

        <footer className="bg-white px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] text-center">
          <p className="text-[10px] text-slate-400">
            Virginia SBSD Virtual Assistant
          </p>
        </footer>
      </div>
    </section>
  );
}