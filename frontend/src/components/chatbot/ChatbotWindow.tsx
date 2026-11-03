
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
    <section
      role="dialog"
      aria-label="Virginia SBSD Virtual Assistant"
      className="flex h-[min(650px,calc(100dvh-110px))] w-[min(390px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
    >
      <header className="flex items-center justify-between bg-[#142B49] px-4 py-4 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
            <Bot size={23} />
          </div>

          <div>
            <h2 className="text-sm font-semibold">
              Virginia SBSD Assistant
            </h2>

            <p className="mt-1 text-xs text-blue-100">
              Business & Loan Support
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
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

      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2">
        <ShieldCheck size={15} className="text-emerald-600" />

        <p className="text-[11px] text-slate-500">
          AI-powered information assistant. Verify important
          requirements with official SBSD resources.
        </p>
      </div>

      <div
        className="flex-1 space-y-4 overflow-y-auto bg-white p-4"
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

      <ChatInput
        onSend={onSendMessage}
        disabled={loading}
      />

      <footer className="bg-white px-3 pb-2 text-center">
        <p className="text-[10px] text-slate-400">
          Virginia SBSD Virtual Assistant
        </p>
      </footer>
    </section>
  );
}
