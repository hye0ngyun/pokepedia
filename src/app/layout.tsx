import type { Metadata } from "next";
import "./globals.css";
import { Box, Container, Fab, ThemeProvider } from "@mui/material";
import Header from "@/components/client/header";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import theme from "@/lib/theme";
import ScrollTop from "@/components/client/back-to-top";
import { KeyboardArrowUp } from "@mui/icons-material";

export const metadata: Metadata = {
  title: "PokePedia - 포켓몬 백과사전",
  description:
    "포켓몬을 백과사전처럼 볼 수 있는 페이지입니다. 포켓몬을 속성별로 모아서 볼 수도 있습니다.",
};

export default function RootLayout({
  children,
  window,
}: Readonly<{
  children: React.ReactNode;
  window?: () => Window;
}>) {
  return (
    <html lang="kr">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Header />
            <Container maxWidth="lg">
              <Box pt={5} pb={10}>
                {children}
              </Box>
            </Container>
            <ScrollTop {...{ window, children }}>
              <Fab color="primary" size="small" aria-label="scroll back to top">
                <KeyboardArrowUp />
              </Fab>
            </ScrollTop>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
