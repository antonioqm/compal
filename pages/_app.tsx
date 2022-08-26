import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import {theme} from '../theme'
import CssBaseline from "@mui/material/CssBaseline";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>} >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
        </Suspense>
    </RecoilRoot>
  );
}

export default MyApp;

