import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import "../styles/globals.css";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { Provider } from "react-redux";
import { store } from "../services/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { theme } from "../theme";
import { ModalsProvider } from "@mantine/modals";

function MyApp({ Component, pageProps }: AppProps) {
  //let persistor = persistStore(store);
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        {/*<PersistGate loading={null} persistor={persistor}>*/}
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{ colorScheme, ...theme }}
            withNormalizeCSS
            withGlobalStyles
          >
            <ModalsProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ModalsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
        {/*</PersistGate>*/}
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
