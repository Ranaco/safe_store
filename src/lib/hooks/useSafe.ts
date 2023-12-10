import { ethers, providers } from "ethers";
import EthersAdapter from "@safe-global/safe-ethers-lib";
import { SafeFactory } from "@safe-global/safe-core-sdk";
import { useSDK } from "@metamask/sdk-react";

const useSafeWallet = () => {
  const { provider, connected } = useSDK();
  const createGaslessWallet = async (safeAuth: any) => {
    await safeAuth.signIn();

    const ethProvider = new ethers.providers.Web3Provider(provider);
  };
  const create = async (owners: any[]) => {
    const ethProvider = new ethers.providers.Web3Provider(provider);

    const signer = ethProvider.getSigner();

    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer,
    });
    console.log("ethAdapter", ethAdapter);

    const safeFactory = await SafeFactory.create({
      ethAdapter: ethAdapter,
    });
    console.log("sf", safeFactory);

    const safeAccountConfig = {
      owners: owners,
      threshold: owners.length,
    };

    const safeSdkOwner = await safeFactory.deploySafe({ safeAccountConfig });
    console.log("owner", safeSdkOwner);

    const safeAddress = safeSdkOwner.getAddress();

    console.log("Your Safe has been deployed:");
    console.log(`https://goerli.etherscan.io/address/${safeAddress}`);
    console.log(`https://app.safe.global/gor:${safeAddress}`);

    return safeAddress;
  };

  return { create, createGaslessWallet };
};
