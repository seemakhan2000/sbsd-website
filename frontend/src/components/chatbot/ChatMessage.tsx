
"use client";

import { Bot, User, ExternalLink } from "lucide-react";
import type { ChatMessageType } from "./chatbot.types";

interface Props {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: Props) {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={`flex items-start gap-2.5 ${
        isAssistant ? "justify-start" : "justify-end"
      }`}
    >
      {isAssistant && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#18365B] text-white">
          <Bot size={17} />
        </div>
      )}

      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
          isAssistant
            ? "rounded-tl-sm bg-slate-100 text-slate-800"
            : "rounded-tr-sm bg-[#18365B] text-white"
        }`}
      >
        <p className="whitespace-pre-wrap break-words text-sm leading-6">
          {message.content}
        </p>

        {isAssistant &&
          message.sources &&
          message.sources.length > 0 && (
            <div className="mt-4 border-t border-slate-200 pt-3">
              <div className="mb-2 flex items-center gap-2">
                <ExternalLink
                  size={14}
                  className="text-slate-500"
                />

                <p className="text-xs font-semibold text-slate-700">
                  Official SBSD Source
                </p>
              </div>

              <div className="space-y-2">
                {message.sources.map((source) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#18365B] transition-colors hover:text-blue-700 hover:underline"
                  >
                    Visit Official Website
                    <ExternalLink size={12} />
                  </a>
                ))}
              </div>
            </div>
          )}
      </div>

      {!isAssistant && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600">
          <User size={17} />
        </div>
      )}
    </div>
  );
}
