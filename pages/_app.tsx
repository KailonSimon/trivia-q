import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import Layout from "../components/Layout";
import "../styles/globals.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { NextUIProvider } from "@nextui-org/react";
import { lightTheme, darkTheme } from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [theme, setTheme] = useState(darkTheme);

  const toggleTheme = () => {
    if (theme === lightTheme) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  };

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NextUIProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
