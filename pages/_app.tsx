import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";
import CssBaseline from "@mui/material/CssBaseline";
import { RecoilRoot, useRecoilState } from "recoil";
import { Suspense } from "react";
import { Snackbar, Alert } from "@mui/material";
import { AuthProvider } from "../src/contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <CssBaseline />
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </RecoilRoot>
      </ThemeProvider>
    </Suspense>
  );
}

export default MyApp;
