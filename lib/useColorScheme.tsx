import { useColorScheme as useNativewindColorScheme } from "nativewind";
import * as React from "react";
import { Platform } from "react-native";
import { setAndroidNavigationBar } from "./android-navigation-bar";

export function useColorScheme() {
  const { colorScheme, setColorScheme: nativeSetColorScheme } =
    useNativewindColorScheme();
  const isChangingTheme = React.useRef(false);

  // Optimized setColorScheme function that handles platform-specific operations efficiently
  const setColorScheme = React.useCallback(
    (theme: "light" | "dark") => {
      if (isChangingTheme.current) return; // Prevent multiple rapid changes
      isChangingTheme.current = true;

      // Apply theme change immediately to UI
      nativeSetColorScheme(theme);

      // Handle Android navigation bar in background
      if (Platform.OS === "android") {
        Promise.resolve().then(() => {
          setAndroidNavigationBar(theme).finally(() => {
            isChangingTheme.current = false;
          });
        });
      } else {
        // For non-Android platforms, just reset the flag
        isChangingTheme.current = false;
      }
    },
    [nativeSetColorScheme]
  );

  // Optimized toggle function
  const toggleColorScheme = React.useCallback(() => {
    const newTheme = colorScheme === "dark" ? "light" : "dark";
    setColorScheme(newTheme);
  }, [colorScheme, setColorScheme]);

  return {
    colorScheme: colorScheme ?? "dark",
    isDarkColorScheme: colorScheme === "dark",
    setColorScheme,
    toggleColorScheme,
  };
}
