import * as React from "react";
import GroceryAbi from "../abi/grocery-abi";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";

const useWeb3 = () => {
  const getContract = React.useCallback(async () => {
    const browserProvider = new ethers.providers.Web3Provider(provider);
    const signer = browserProvider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, GroceryAbi, signer);
    console.log(contract);

    return contract;
  }, [account, connected]);

  const userIsPresent = async () => {
    const contract = await getContract();
    const isPresent = await (await contract?.addressToUser()).call();
    console.log(isPresent);
  };

  const addUser = async (userCID: string) => {
    const contract = await getContract();
    await (await contract?.addUser(userCID)).send({ from: "" });
  };

  const bookItem = async (itemId: string, orderCID: string) => {
    const contract = await getContract();
    await (await contract?.bookItem(itemId, orderCID)).send({ from: "" });
  };

  const getUserData = async () => {
    const contract = await getContract();
    await (await contract?.getUserData()).call();
  };

  return {
    userIsPresent,
    addUser,
    bookItem,
    getUserData,
  };
};

export default useWeb3;
