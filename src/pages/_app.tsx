import "@/styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import Layout from "@/components/layouts/main";
import { NextUIProvider } from "@nextui-org/react";
import * as React from "react";
import { AppContextType, AppContextValue } from "@/lib/types/state";
import { MetaMaskProvider, useSDK } from "@metamask/sdk-react";

const AppContext = React.createContext<AppContextType>({} as AppContextType);

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    console.error("useAppcontext must be called inside the  provider");
  }

  return context;
};

export default function App({ Component, pageProps, router }: AppProps) {
  const { account } = useSDK();
  React.useEffect(() => {
    if (account === undefined) {
      router.replace("/");
    }
  }, [account]);

  const [state, setState] = React.useState<AppContextValue>({
    address: "",
    user: undefined,
  });

  return (
    <MetaMaskProvider
      debug={true}
      sdkOptions={{
        checkInstallationImmediately: false,
        dappMetadata: {
          name: "Safe Shop",
          url:
            typeof window !== "undefined" ? window.location.host + "home" : "",
        },
      }}
    >
      <NextUIProvider>
        <AppContext.Provider value={{ state, setState }}>
          {router.pathname !== "/" && router.pathname !== "/login" ? (
            <Layout router={router}>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}
        </AppContext.Provider>
      </NextUIProvider>
    </MetaMaskProvider>
  );
}
