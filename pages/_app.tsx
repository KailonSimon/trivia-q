import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import Layout from "../components/Layout";
import "../styles/globals.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { NextUIProvider } from "@nextui-org/react";
import { lightTheme, darkTheme } from "../theme";
import { Provider } from "react-redux";
import { store } from "../services/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState(darkTheme);
  let persistor = persistStore(store);

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NextUIProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NextUIProvider>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
