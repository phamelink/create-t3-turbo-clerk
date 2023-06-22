/* eslint-disable @typescript-eslint/no-var-requires */
import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts as useFontsExpo, type FontSource } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { type Theme } from "native-base";

export const fonts = {
  "Prompt-Thin":
    require("~/../assets/fonts/Prompt/Prompt-Thin.ttf") as FontSource,
  "Prompt-ThinItalic":
    require("~/../assets/fonts/Prompt/Prompt-ThinItalic.ttf") as FontSource,
  "Prompt-ExtraLight":
    require("~/../assets/fonts/Prompt/Prompt-ExtraLight.ttf") as FontSource,
  "Prompt-ExtraLightItalic":
    require("~/../assets/fonts/Prompt/Prompt-ExtraLightItalic.ttf") as FontSource,
  "Prompt-Light":
    require("~/../assets/fonts/Prompt/Prompt-Light.ttf") as FontSource,
  "Prompt-LightItalic":
    require("~/../assets/fonts/Prompt/Prompt-LightItalic.ttf") as FontSource,
  "Prompt-Regular":
    require("~/../assets/fonts/Prompt/Prompt-Regular.ttf") as FontSource,
  "Prompt-Italic":
    require("~/../assets/fonts/Prompt/Prompt-Italic.ttf") as FontSource,
  "Prompt-Medium":
    require("~/../assets/fonts/Prompt/Prompt-Medium.ttf") as FontSource,
  "Prompt-MediumItalic":
    require("~/../assets/fonts/Prompt/Prompt-MediumItalic.ttf") as FontSource,
  "Prompt-SemiBold":
    require("~/../assets/fonts/Prompt/Prompt-SemiBold.ttf") as FontSource,
  "Prompt-SemiBoldItalic":
    require("~/../assets/fonts/Prompt/Prompt-SemiBoldItalic.ttf") as FontSource,
  "Prompt-Bold":
    require("~/../assets/fonts/Prompt/Prompt-Bold.ttf") as FontSource,
  "Prompt-BoldItalic":
    require("~/../assets/fonts/Prompt/Prompt-BoldItalic.ttf") as FontSource,
  "Prompt-ExtraBold":
    require("~/../assets/fonts/Prompt/Prompt-ExtraBold.ttf") as FontSource,
  "Prompt-ExtraBoldItalic":
    require("~/../assets/fonts/Prompt/Prompt-ExtraBoldItalic.ttf") as FontSource,
  "Prompt-Black":
    require("~/../assets/fonts/Prompt/Prompt-Black.ttf") as FontSource,
  "Prompt-BlackItalic":
    require("~/../assets/fonts/Prompt/Prompt-BlackItalic.ttf") as FontSource,
};

export const fontConfig = {
  Prompt: {
    100: {
      normal: "Prompt-Thin",
      italic: "Prompt-ThinItalic",
    },
    200: {
      normal: "Prompt-ExtraLight",
      italic: "Prompt-ExtraLightItalic",
    },
    300: {
      normal: "Prompt-Light",
      italic: "Prompt-LightItalic",
    },
    400: {
      normal: "Prompt-Regular",
      italic: "Prompt-Italic",
    },
    500: {
      normal: "Prompt-Medium",
      italic: "Prompt-MediumItalic",
    },
    600: {
      normal: "Prompt-SemiBold",
      italic: "Prompt-SemiBoldItalic",
    },
    700: {
      normal: "Prompt-Bold",
      italic: "Prompt-BoldItalic",
    },
    800: {
      normal: "Prompt-ExtraBold",
      italic: "Prompt-ExtraBoldItalic",
    },
    900: {
      normal: "Prompt-Black",
      italic: "Prompt-BlackItalic",
    },
  },
};
