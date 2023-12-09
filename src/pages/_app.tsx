import "@/styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import Layout from "@/components/layouts/main";
import { NextUIProvider } from "@nextui-org/react";
import * as React from "react";
import { AppContextType } from "@/lib/types/state";

const AppContext = React.createContext<AppContextType>({} as AppContextType);

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    console.error("useAppcontext must be called inside the  provider");
  }

  return context;
};

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <NextUIProvider>
      <Layout router={router}>
        <Component {...pageProps} />
      </Layout>
    </NextUIProvider>
  );
}
