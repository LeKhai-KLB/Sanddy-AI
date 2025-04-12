import { create } from "zustand";

// Types for our chat functionality
export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
  isLoading?: boolean;
}

export type Messages = Message[];

interface ChatState {
  messages: Messages;
  isProcessing: boolean;
  addMessage: (
    content: string,
    role: MessageRole,
    isLoading?: boolean
  ) => string;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  clearMessages: () => void;
  sendMessage: (content: string) => Promise<void>;
}

// This is a simple mock API response function
// In a real app, you would replace this with actual API calls
async function mockApiResponse(message: string): Promise<string> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simple responses based on user input
  if (
    message.toLowerCase().includes("hello") ||
    message.toLowerCase().includes("hi")
  ) {
    return "Hello! How can I help you today?";
  } else if (message.toLowerCase().includes("help")) {
    return "I'm here to help! What do you need assistance with?";
  } else if (message.toLowerCase().includes("thank")) {
    return "You're welcome! Is there anything else you need help with?";
  } else {
    return (
      'I understand you said: "' +
      message +
      '". In a real app, this would connect to an AI service for more intelligent responses.'
    );
  }
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [
    {
      id: "1",
      content: "Hello! How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ],
  isProcessing: false,

  addMessage: (content, role, isLoading = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date(),
      isLoading,
    };

    set((state) => ({
      messages: [...state.messages, newMessage],
    }));

    return newMessage.id;
  },

  updateMessage: (id, updates) => {
    set((state) => ({
      messages: state.messages.map((message) =>
        message.id === id ? { ...message, ...updates } : message
      ),
    }));
  },

  clearMessages: () => {
    set({
      messages: [
        {
          id: "1",
          content: "Hello! How can I help you today?",
          role: "assistant",
          timestamp: new Date(),
        },
      ],
    });
  },

  sendMessage: async (content) => {
    if (!content.trim()) return;

    // Don't allow sending messages while processing
    if (get().isProcessing) return;

    // Add user message
    get().addMessage(content, "user");

    // Set processing state
    set({ isProcessing: true });

    // Add loading message for assistant
    const loadingMsgId = get().addMessage("", "assistant", true);

    try {
      // Get response from API (mock in this case)
      const response = await mockApiResponse(content);

      // Update the loading message with the response
      get().updateMessage(loadingMsgId, {
        content: response,
        isLoading: false,
      });
    } catch (error) {
      // Handle error
      get().updateMessage(loadingMsgId, {
        content: "Sorry, I encountered an error. Please try again.",
        isLoading: false,
      });
      console.error("Error getting response:", error);
    } finally {
      // Reset processing state
      set({ isProcessing: false });
    }
  },
}));
