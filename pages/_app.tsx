import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "../src/contexts/AuthContext";
import "../styles/globals.scss";
import { theme } from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <CssBaseline />
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </RecoilRoot>
      </ThemeProvider>
  );
}

export default MyApp;
