import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

export const theme = extendTheme(
  {
    fonts: {
      heading: "Ubuntu",
      body: "Inter",
    },
    shadows: {
      outline: "0 0 0px 3px #C0C0C0",
    },

    colors: {
      current: "#8601AF",
      white: "#F0F0F0",
      black: "#303030",
      primary: {
        50: "#CA20FE",
        100: "#C50BFE",
        200: "#BB01F4",
        300: "#AB01DF",
        400: "#9C01CB",
        500: "#8601AF",
        600: "#7D01A2",
        700: "#6D018E",
        800: "#5E017A",
        900: "#4E0165",
      },
      green: {
        50: "#B8FF1F",
        100: "#B1FF0A",
        200: "#A7F500",
        300: "#99E000",
        400: "#8BCC00",
        500: "#7FB800",
        600: "#70A300",
        700: "#628F00",
        800: "#547A00",
        900: "#466600",
      },
      //Azul é usado como foco em inputs, mas queremos roxo
      blue: {
        500: "#8601AF",
      },
      red: {
        50: "#FA9589",
        100: "#F98376",
        200: "#F87162",
        300: "#F8604F",
        400: "#F74E3B",
        500: "#F6311D",
        600: "#F52B14",
        700: "#EB200A",
        800: "#D71E09",
        900: "#C41B08",
      },
      gray: {
        50: "#999999",
        100: "#8F8F8F",
        200: "#858585",
        300: "#7A7A7A",
        400: "#707070",
        500: "#666666",
        600: "#5C5C5C",
        700: "#525252",
        800: "#474747",
        900: "#3D3D3D",
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "primary" })
);
