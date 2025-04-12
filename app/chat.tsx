import * as React from "react";
import { FlatList, KeyboardAvoidingView, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MessageBubble } from "~/components/chat/MessageBubble";
import { ChatInput } from "~/components/chat/ChatInput";
import { ChatHeader } from "~/components/chat/ChatHeader";
import { useChatStore } from "~/lib/store/chat-store";

// Main chat screen component
export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const { messages } = useChatStore();
  const flatListRef = React.useRef<FlatList>(null);

  // Scroll to bottom when messages change
  React.useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-background"
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ChatHeader />
      <View
        className="flex-1 px-4"
        style={{ paddingBottom: insets.bottom, marginTop: insets.top }}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MessageBubble message={item} />}
          contentContainerStyle={{ paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
        />

        <ChatInput className="mb-4" />
      </View>
    </KeyboardAvoidingView>
  );
}
