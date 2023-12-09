import * as React from "react";
import GroceryAbi from "../abi/grocery-abi";
import { useSDK } from "@metamask/sdk-react";
import Web3 from "web3";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const useWeb3 = () => {
  const { provider, account } = useSDK();

  const web3 = new Web3(provider);

  const contract = new web3.eth.Contract(GroceryAbi, CONTRACT_ADDRESS);

  const userIsPresent = async (): Promise<boolean> => {
    const isPresent = await contract.methods.users().call();

    return isPresent[account] !== undefined;
  };

  const addUser = async (userCID: string) => {
    await contract.methods.addUser(userCID).send({ from: account });
  };

  const bookItem = async (itemId: number, orderCID: string) => {
    await contract.methods.bookItem(itemId, orderCID).send({ from: account });
  };

  const getUserData = async () => {
    return await contract.methods.getUserData().call();
  };

  return {
    userIsPresent,
    addUser,
    bookItem,
    getUserData,
  };
};

export default useWeb3;
