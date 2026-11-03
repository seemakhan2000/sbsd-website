export interface ChatMessageType {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: {
    title: string;
    url: string;
  }[];
}

export interface ChatbotWindowProps {
  messages: ChatMessageType[];
  loading: boolean;
  onSendMessage: (message: string) => void;
  onClose: () => void;
}