import * as React from "react";
import { Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import { Text } from "~/components/ui/text";
import { useChatStore } from "~/lib/store/chat-store";
import { Back } from "~/lib/icons/Back";
import { Plus } from "~/lib/icons/Plus";
import { ThemeToggle } from "../ThemeToggle";

interface ChatHeaderProps {
  title?: string;
}

export function ChatHeader({ title = "Chat" }: ChatHeaderProps) {
  const router = useRouter();
  const { clearMessages } = useChatStore();

  const handleNewChat = () => {
    clearMessages();
  };

  return (
    <View
      className="flex-row items-center justify-between py-2 px-3 border-b border-border bg-background fixed top-8 left-0 right-0 z-50"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => router.back()} className="p-2 -ml-2">
          <Back className="text-primary" size={24} strokeWidth={1.75} />
        </Pressable>
        <Text className="text-foreground font-bold text-lg ml-2">
          Bubble box
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemeToggle />
        <Pressable onPress={handleNewChat} className="p-2 -mr-2">
          <Plus className="text-primary" size={24} strokeWidth={1.75} />
        </Pressable>
      </View>
    </View>
  );
}
