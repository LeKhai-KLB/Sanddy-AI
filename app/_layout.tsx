import "~/global.css";

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform, View } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { Text } from "~/components/ui/text";
import { ThemedLogo } from "~/components/ui/themed-logo";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeToggle } from "~/components/ThemeToggle";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { useIsomorphicLayoutEffect } from "~/lib/custom-hooks/useIsomorphicLayoutEffect";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const [backgroundInHex, setBackgroundInHex] = React.useState(
    isDarkColorScheme ? NAV_THEME.dark.background : NAV_THEME.light.background
  );

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  useIsomorphicLayoutEffect(() => {
    setBackgroundInHex(
      isDarkColorScheme ? NAV_THEME.dark.background : NAV_THEME.light.background
    );
  }, [isDarkColorScheme]);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <View style={{ flex: 1, backgroundColor: backgroundInHex }}>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerTitle: () => (
                <View className="flex-row items-center">
                  <ThemedLogo size="md" className="mr-2" />
                  <Text className="text-foreground font-bold text-lg">
                    Sanddy AI
                  </Text>
                </View>
              ),
              headerRight: () => <ThemeToggle />,
            }}
          />
          <Stack.Screen
            name="chat"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
        <PortalHost />
      </View>
    </ThemeProvider>
  );
}
