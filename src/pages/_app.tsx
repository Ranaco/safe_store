import "@/styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import Layout from "@/components/layouts/main";
import { NextUIProvider } from "@nextui-org/react";
import * as React from "react";
import { AppContextType, AppContextValue } from "@/lib/types/state";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import loadContracts from "@/lib/load-contract";

const AppContext = React.createContext<AppContextType>({} as AppContextType);

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    console.error("useAppcontext must be called inside the  provider");
  }

  return context;
};

export default function App({ Component, pageProps, router }: AppProps) {
  const [state, setState] = React.useState<AppContextValue>(
    {} as AppContextValue,
  );

  const updateWallet = async (accounts: any, contract?: any) => {
    const account = accounts[0];
    const isRegistered = await contract.methods.isRegistered(account).call();
    // const user = await fetchUserData({ address: account });
    setState((val) => ({
      ...val,
      account,
      contract,
    }));
    // if (!isRegistered) {
    //   router.replace("/register");
    // } else {
    //   //TODO:: Implement DB
    // }
  };

  const handleConnect = async () => {
    if (typeof window !== "undefined") {
      await window
        .ethereum!.request({
          method: "eth_requestAccounts",
        })
        .then((accounts) => {
          updateWallet(accounts);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

  React.useEffect(() => {
    handleConnect();
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });

      if (provider && typeof window !== "undefined") {
        const accounts = await window.ethereum!.request({
          method: "eth_requestAccounts",
        });
        const web3 = new Web3(provider as any);
        const contract = await loadContracts(web3);
      }
    };

    getProvider();
  });

  return (
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
  );
}
