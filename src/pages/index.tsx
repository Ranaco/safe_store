import * as React from "react";
import { Button, Input, Switch } from "@nextui-org/react";
import { useSDK } from "@metamask/sdk-react";
import { useRouter } from "next/router";
import { UserType, UserTypeEnum } from "@/lib/types/user";
import Image from "next/image";
import useWeb3 from "@/lib/hooks/useWeb3";

const CusButton = () => {
  return (
    <Button
      type="submit"
      variant="ghost"
      size="lg"
      className="text-lg rounded-md bg-white/50"
    >
      <Image
        src="/images/metamask-logo.svg"
        height={50}
        width={140}
        alt={"Metamask logo"}
      />
    </Button>
  );
};

const App = () => {
  const { sdk, account, connected, connecting, provider, chainId } = useSDK();
  const router = useRouter();
  const { userIsPresent } = useWeb3();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      if (accounts !== undefined) {
        router.replace("/home");
      }
      return accounts ? accounts : undefined;
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  React.useEffect(() => {
    if (account) {
      router.replace("/home");
    }
  }, [account]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const account = await connect();
  };

  return (
    <div className="h-screen w-screen flex flex-col gap-10 items-center py-5">
      <span className="text-5xl font-bold text-center">
        Login
        <br /> to <br />
        <span className="text-green-500">Safe </span>Soap
      </span>
      <Button
        type="submit"
        variant="ghost"
        size="lg"
        className="text-lg rounded-md bg-white/50 mt-[50%]"
      >
        <Image
          src="/images/metamask-logo.svg"
          height={50}
          width={140}
          alt={"Metamask logo"}
        />
      </Button>
    </div>
  );
};

export default App;
