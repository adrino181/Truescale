import React, { startTransition, useEffect } from "react";
import "@/styles/globals.css";
import "@/styles/editor.css";
import type { AppProps } from "next/app";
import createEmotionCache from "@/utils/stylesCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import WelcomeLayout from "@/components/Blocks/Layout/WelcomeLayout";
import { AuthProvider } from "@/components/Blocks/Contexts/AuthContext";
import ColorModeProvider from "@/components/Blocks/Contexts/ColorModeContext";
import ProgressLoader from "@/components/atoms/ProgressLoader";
import Router from "next/router";
import { bootstrapUser } from "@/redux/bootstrap";
import AnalyticsProvider from "@/components/Blocks/Contexts/AnalyticsContext";
const clientSideEmotionCache = createEmotionCache();

interface CustomAppProps extends AppProps {
  Component: any;
  emotionCache?: EmotionCache;
}

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: CustomAppProps) {
  const Layout = Component.Layout || WelcomeLayout;
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      startTransition(() => {
        setLoading(true);
      });
    };
    const end = () => {
      startTransition(() => {
        setLoading(false);
      });
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  useEffect(() => {
    const bootstrap = async () => {
      await store.dispatch(bootstrapUser());
    };

    bootstrap();
  }, []);
  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <ColorModeProvider>
          <AuthProvider>
            <AnalyticsProvider>
              <Layout>
                {loading ? <ProgressLoader /> : <Component {...pageProps} />}
                {/* {<ProgressLoader />} */}
              </Layout>
            </AnalyticsProvider>
          </AuthProvider>
        </ColorModeProvider>
      </Provider>
    </CacheProvider>
  );
}
