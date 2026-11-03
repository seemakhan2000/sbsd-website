"use client";

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm bg-slate-100 px-4 py-3">
      <span className="text-xs text-slate-500">
        Assistant is typing
      </span>

      <div className="flex gap-1">
        {[0, 1, 2].map((item) => (
          <span
            key={item}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#18365B]"
            style={{
              animationDelay: `${item * 150}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}