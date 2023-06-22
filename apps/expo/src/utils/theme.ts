import { extendTheme } from "native-base";

import { fontConfig } from "~/config/fonts";

export const theme = extendTheme({
  fontConfig: fontConfig,
  fonts: {
    heading: "Prompt",
    body: "Prompt",
    mono: "Prompt",
  },
});

// 2. Get the type of the CustomTheme
type CustomThemeType = typeof theme;

// 3. Extend the internal NativeBase Theme
declare module "native-base" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ICustomTheme extends CustomThemeType {}
}
