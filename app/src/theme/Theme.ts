import { extendTheme } from "native-base";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme(
  { config },
  {
    colors: {
      error: {
        100: "#E53535",
        200: "#FF5C5C",
        300: "#FF8080",
        400: "#FF6262",
        main: "#FF6262",
      },
      warning: {
        100: "#E5B800",
        200: "#FDDD48",
        300: "#FDED72",
        w: "#FFCC00",
      },
      info: {
        100: "#004FC4",
        200: "#5B8DEF",
        300: "#9DBFF9",
        main: "#0063F7",
      },
      success: {
        main: "#06C270",
        100: "#05A660",
        200: "#39D98A",
        300: "#57EBA1",
      },
    },
  }
);
