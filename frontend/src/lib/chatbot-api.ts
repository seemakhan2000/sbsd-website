const API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL;

export interface ChatSource {
  title: string;
  url: string;
}

export interface ChatResponse {
  success: boolean;
  data: {
    conversationId: string;
    answer: string;
    sources: ChatSource[];
  };
}

interface SendMessagePayload {
  conversationId?: string;
  sessionId: string;
  message: string;
  pageUrl: string;
}

export const sendChatMessage = async (
  payload: SendMessagePayload
): Promise<ChatResponse> => {
  const response = await fetch(`${API_URL}/chatbot/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(45000),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Unable to send message."
    );
  }

  return result;
};