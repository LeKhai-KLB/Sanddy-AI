import * as React from "react";
import { Image } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";

interface ThemedLogoProps {
  className?: string;
  size?: "sm" | "md" | "llg" | "lg";
}

const LOGO_SIZES = {
  sm: { width: 24, height: 24 },
  md: { width: 36, height: 36 },
  llg: { width: 40, height: 40 },
  lg: { width: 48, height: 48 },
};

export function ThemedLogo({ className = "", size = "md" }: ThemedLogoProps) {
  const { isDarkColorScheme } = useColorScheme();
  const dimensions = LOGO_SIZES[size];

  return (
    <Image
      source={
        isDarkColorScheme
          ? require("~/assets/app/chatbot-logo-dark-cropped.png")
          : require("~/assets/app/chatbot-logo-light-cropped.png")
      }
      style={dimensions}
      className={className}
      resizeMode="contain"
    />
  );
}
