import * as React from "react";
import { View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { Text } from "~/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useColorScheme } from "~/lib/useColorScheme";
import { Message } from "~/lib/store/chat-store";
import { ThemedLogo } from "~/components/ui/themed-logo";

// Sample avatar URL for user
const USER_AVATAR_URI =
  "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      className={`flex-row ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      {!isUser && (
        <Avatar
          className="w-8 h-8 mr-2 items-center justify-center"
          alt="system avatar"
        >
          <ThemedLogo size="llg" />
        </Avatar>
      )}

      <View
        className={`px-4 py-2 rounded-2xl max-w-[80%] ${
          isUser
            ? "bg-primary rounded-tr-none"
            : isDarkColorScheme
            ? "bg-secondary rounded-tl-none"
            : "bg-secondary/80 rounded-tl-none"
        }`}
      >
        {message.isLoading ? (
          <Text className="text-foreground">...</Text>
        ) : (
          <Text
            className={`${
              isUser ? "text-primary-foreground" : "text-foreground"
            }`}
          >
            {message.content}
          </Text>
        )}
      </View>

      {isUser && (
        <Avatar className="w-8 h-8 ml-3" alt="user avatar">
          <AvatarImage source={{ uri: USER_AVATAR_URI }} />
          <AvatarFallback>
            <Text>ME</Text>
          </AvatarFallback>
        </Avatar>
      )}
    </Animated.View>
  );
}
