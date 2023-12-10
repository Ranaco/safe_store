import GroceryAbi from "../lib/abi/grocery-abi";

const loadContracts = async (web3: any) => {
  const TRIVID_ADD = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  if (web3 !== undefined) {
    try {
      console.log("This is trivid address", TRIVID_ADD);
      const contract = new web3.eth.Contract(GroceryAbi, TRIVID_ADD);
      return contract;
    } catch (err) {
      console.error(err);
    }
  }
};

export default loadContracts;
