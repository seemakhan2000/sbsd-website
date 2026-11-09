"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X, Bot, ArrowRight } from "lucide-react";

import ChatbotWindow from "./ChatbotWindow";

import type { ChatMessageType } from "./chatbot.types";

import { sendChatMessage } from "../../lib/chatbot-api";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  // X dabane ke baad jab tak mouse bahar na jaye, hover se card na aaye
  const [hoverSuppressed, setHoverSuppressed] = useState(false);

  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  const [conversationId, setConversationId] = useState<
    string | undefined
  >();

  // Button entrance + greeting card auto show
  useEffect(() => {
    const buttonTimer = setTimeout(() => setMounted(true), 400);

    let dismissed = false;
    try {
      dismissed =
        sessionStorage.getItem("sbsd_greeting_dismissed") === "1";
    } catch {}

    const greetingTimer = setTimeout(() => {
      if (!dismissed) setShowGreeting(true);
    }, 2000);

    return () => {
      clearTimeout(buttonTimer);
      clearTimeout(greetingTimer);
    };
  }, []);

  // Mobile par chat khula ho to background page scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const mq = window.matchMedia("(max-width: 639px)");
    if (!mq.matches) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Escape key se close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const dismissGreeting = () => {
    setShowGreeting(false);
    setHoverSuppressed(true);
    try {
      sessionStorage.setItem("sbsd_greeting_dismissed", "1");
    } catch {}
  };

  const getSessionId = () => {
    let sessionId = sessionStorage.getItem("sbsd_chat_session");

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem("sbsd_chat_session", sessionId);
    }

    return sessionId;
  };

  const handleSendMessage = async (value: string) => {
    if (loading) return;

    const userMessage: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "user",
      content: value,
    };

    setMessages((previous) => [...previous, userMessage]);

    setLoading(true);

    try {
      const result = await sendChatMessage({
        conversationId,
        sessionId: getSessionId(),
        message: value,
        pageUrl: window.location.pathname,
      });

      setConversationId(result.data.conversationId);

      const assistantMessage: ChatMessageType = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: result.data.answer,
        sources: result.data.sources,
      };

      setMessages((previous) => [...previous, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessageType = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "I'm sorry, I'm unable to process your request right now. Please try again shortly.",
      };

      setMessages((previous) => [...previous, errorMessage]);

      console.error("Chatbot request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (loading) return;

    setMessages([]);
    setConversationId(undefined);
  };

  const openChat = () => {
    setIsOpen(true);
    setShowGreeting(false);
  };

  const greetingVisible = showGreeting && !isOpen;

  return (
    <div
      className="
        fixed bottom-3 right-3 sm:bottom-5 sm:right-6
        z-[9999] flex flex-col items-end gap-3 sm:gap-4
        pb-[env(safe-area-inset-bottom)]

        /* Nav/header ki height jo chat window ko cover nahi karni chahiye.
           Apne nav ke hisaab se isay adjust karein. */
        [--sbsd-nav:152px]
      "
    >
      {/* Custom keyframes */}
      <style>{`
        @keyframes sbsd-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes sbsd-shimmer {
          0% { transform: translateX(-120%) skewX(-20deg); }
          60%, 100% { transform: translateX(260%) skewX(-20deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sbsd-float, .sbsd-shimmer { animation: none !important; }
        }
      `}</style>

      {/* ───────── Chatbot Window ─────────
          Mobile  (<640px): full screen sheet
          Desktop (>=640px): floating card, height screen ke hisaab se
                             (neeche anchored, nav ke neeche), 320px - 760px
      */}
      <div
        aria-hidden={!isOpen}
        className={`
          origin-top-right
          transform-gpu will-change-[transform,opacity]
          transition-[opacity,transform,visibility]
          duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          motion-reduce:transition-none

          /* Mobile: full screen */
          max-sm:fixed max-sm:inset-0 max-sm:h-[100dvh] max-sm:w-screen

          /* Desktop: responsive card */
          sm:relative
          sm:w-[min(340px,calc(100vw_-_3.5rem))]
          sm:h-[max(320px,min(760px,calc(100dvh_-_32px_-_var(--sbsd-nav))))]
          sm:max-h-[calc(100dvh_-_32px)]

          ${
            isOpen
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible pointer-events-none -translate-y-8 scale-95 opacity-0"
          }
        `}
      >
        <ChatbotWindow
          messages={messages}
          loading={loading}
          onSendMessage={handleSendMessage}
          onClose={() => setIsOpen(false)}
          onReset={handleReset}
        />
      </div>

      {/* ───────── Floating Assistant Button + Greeting ───────── */}
      <div
        onMouseLeave={() => setHoverSuppressed(false)}
        className={`
          group relative flex items-center gap-4
          transition-all duration-500
          ease-[cubic-bezier(0.34,1.56,0.64,1)]
          motion-reduce:transition-none
          ${
            mounted
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-6 scale-50 opacity-0"
          }
          ${isOpen ? "hidden" : ""}
        `}
      >
        {/* Greeting Card (sirf tablet/desktop par, mobile par button hi kaafi hai) */}
        {!isOpen && (
          <div
            className={`
              hidden sm:block
              origin-right transition-all duration-500
              ease-[cubic-bezier(0.22,1,0.36,1)]
              motion-reduce:transition-none
              ${
                greetingVisible
                  ? "translate-x-0 scale-100 opacity-100"
                  : hoverSuppressed
                  ? "pointer-events-none translate-x-6 scale-95 opacity-0"
                  : "pointer-events-none translate-x-6 scale-95 opacity-0 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
              }
            `}
          >
            <div
              className="sbsd-float relative"
              style={{ animation: "sbsd-float 4s ease-in-out infinite" }}
            >
              <div
                role="button"
                tabIndex={0}
                onClick={openChat}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openChat();
                }}
                className="
                  relative w-[310px] max-w-[calc(100vw-7.5rem)] cursor-pointer overflow-hidden
                  rounded-2xl border border-white/15
                  bg-gradient-to-br from-[#2A5A8C] via-[#18365B] to-[#0F2440]
                  p-4 text-white
                  shadow-[0_18px_45px_rgba(16,39,68,0.45)]
                  transition-shadow duration-300
                  hover:shadow-[0_22px_55px_rgba(16,39,68,0.55)]
                "
              >
                {/* Shimmer sweep */}
                <span
                  className="sbsd-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                  style={{ animation: "sbsd-shimmer 4.5s ease-in-out infinite" }}
                />

                {/* Top highlight line */}
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                {/* Dismiss */}
                <button
                  type="button"
                  aria-label="Dismiss greeting"
                  onClick={(e) => {
                    e.stopPropagation();
                    dismissGreeting();
                  }}
                  className="absolute right-2.5 top-2.5 z-10 flex h-6 w-6 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <X size={14} />
                </button>

                <div className="relative flex items-start gap-3">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur">
                      <Bot size={22} />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" />
                      <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-[#18365B] bg-emerald-400" />
                    </span>
                  </div>

                  <div className="min-w-0 pr-5">
                    <p className="text-[15px] font-semibold leading-tight tracking-tight">
                      SBSD Virtual Assistant
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[11px] font-medium text-emerald-300">
                      Online
                      <span className="text-white/40">•</span>
                      <span className="text-white/60">Replies instantly</span>
                    </p>
                  </div>
                </div>

                {/* Message */}
                <div className="relative mt-3.5 rounded-xl bg-white/10 px-3.5 py-3 ring-1 ring-white/10">
                  <p className="text-[15px] font-medium leading-snug">
                    How can we help you today?
                  </p>

                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      {[0, 150, 300].map((delay) => (
                        <span
                          key={delay}
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60 motion-reduce:animate-none"
                          style={{ animationDelay: `${delay}ms` }}
                        />
                      ))}
                    </span>

                    <span className="flex items-center gap-1 text-xs font-semibold text-white/90">
                      Start chat
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </div>

              {/* Pointer arrow towards button */}
              <span className="absolute -right-1.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rotate-45 rounded-[3px] bg-[#18365B] shadow-[4px_-4px_10px_rgba(16,39,68,0.2)]" />
            </div>
          </div>
        )}

        {/* Main Button */}
        <button
          type="button"
          onClick={() => (isOpen ? setIsOpen(false) : openChat())}
          aria-label={
            isOpen ? "Close virtual assistant" : "Open virtual assistant"
          }
          aria-expanded={isOpen}
          className="
            relative flex h-[48px] w-[48px] shrink-0
            sm:h-[54px] sm:w-[54px]
            items-center justify-center
            rounded-full
            border-2 border-white
            bg-gradient-to-br from-[#244D78] via-[#18365B] to-[#102744]
            text-white
            shadow-[0_8px_30px_rgba(16,39,68,0.35)]
            transition-all duration-300 ease-out
            hover:scale-110
            hover:shadow-[0_12px_35px_rgba(16,39,68,0.45)]
            active:scale-95
            focus:outline-none
            focus-visible:ring-4
            focus-visible:ring-blue-300
            motion-reduce:transition-none
          "
        >
          {/* Ping Ring */}
          <span
            className={`
              absolute inset-0 rounded-full bg-[#244D78]/40
              transition-opacity duration-300
              ${
                isOpen
                  ? "opacity-0"
                  : "animate-ping opacity-100 motion-reduce:animate-none"
              }
            `}
            style={{ animationDuration: "2.5s" }}
          />

          {/* Soft Glow */}
          <span
            className={`
              absolute inset-0 rounded-full bg-white/10
              transition-opacity duration-300
              ${
                isOpen
                  ? "opacity-0"
                  : "animate-pulse opacity-100 motion-reduce:animate-none"
              }
            `}
          />

          {/* Icons (crossfade + rotate) */}
          <span className="relative z-10 flex h-full w-full items-center justify-center">
            <MessageCircle
              size={23}
              strokeWidth={2}
              className={`
                absolute transition-all duration-300 ease-out
                motion-reduce:transition-none
                ${
                  isOpen
                    ? "rotate-90 scale-50 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }
              `}
            />
            <X
              size={21}
              strokeWidth={2.2}
              className={`
                absolute transition-all duration-300 ease-out
                motion-reduce:transition-none
                ${
                  isOpen
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-50 opacity-0"
                }
              `}
            />
          </span>

          {/* Notification Indicator */}
          <span
            className={`
              absolute right-0 top-0 flex h-3.5 w-3.5
              items-center justify-center rounded-full
              border-2 border-white bg-emerald-500
              transition-all duration-300
              motion-reduce:transition-none
              ${isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"}
            `}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </span>
        </button>
      </div>
    </div>
  );
}