"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

import localFont from "next/font/local";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: pretendard.style.fontFamily,
    body1: {
      fontSize: "1.2rem",
    },
    body2: {
      fontSize: "0.9rem",
    },
    h3: {
      fontSize: "2rem",
    },
  },
  palette: {
    primary: {
      main: "#FF9843", // 주요 색상
      light: "#ffb849", // 주요 색상의 밝은 버전
      dark: "#fa7d3f", // 주요 색상의 어두운 버전
      contrastText: "#fff", // 주요 색상에 대한 대조 색상
    },
    secondary: {
      main: "#43aaff", // 보조 색상
      light: "#92ceff", // 보조 색상의 밝은 버전
      dark: "#218ef0", // 보조 색상의 어두운 버전
      contrastText: "#fff", // 보조 색상에 대한 대조 색상
    },
    // 추가적인 색상 정의 가능
  },
});

export default theme;
