import * as React from "react";
import { Pressable, TextInput, View } from "react-native";
import { Text } from "~/components/ui/text";
import { useChatStore } from "~/lib/store/chat-store";
import { Send } from "~/lib/icons/Send"; // Import the SendIcon component

interface ChatInputProps {
  className?: string;
}

export function ChatInput({ className }: ChatInputProps) {
  const [inputText, setInputText] = React.useState("");
  const { sendMessage, isProcessing } = useChatStore();

  const handleSendMessage = async () => {
    if (!inputText.trim() || isProcessing) return;

    const messageText = inputText.trim();
    setInputText("");
    await sendMessage(messageText);
  };

  return (
    <View
      className={`flex-row items-center border border-border rounded-full px-4 py-2 ${className}`}
    >
      <TextInput
        className="flex-1 text-foreground min-h-[40px] native:text-base"
        placeholder="Type a message..."
        placeholderTextColor="#999"
        value={inputText}
        onChangeText={setInputText}
        multiline
        editable={!isProcessing}
        onSubmitEditing={handleSendMessage}
      />
      <Pressable
        onPress={handleSendMessage}
        disabled={!inputText.trim() || isProcessing}
        className={`ml-2 p-2 rounded-full ${
          !inputText.trim() || isProcessing ? "opacity-50" : ""
        } bg-primary justify-center items-center p-3`}
      >
        <Send className="text-primary-foreground" size={18} />
      </Pressable>
    </View>
  );
}
