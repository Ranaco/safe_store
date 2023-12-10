import * as React from "react";
import { Button, Input, Switch } from "@nextui-org/react";
import { useSDK } from "@metamask/sdk-react";
import { useRouter } from "next/router";
import Image from "next/image";
import useWeb3 from "@/lib/hooks/useWeb3";
import {
  AnonAadhaarProof,
  LogInWithAnonAadhaar,
  useAnonAadhaar,
} from "anon-aadhaar-react";

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
  const [metaValid, setMetaValid] = React.useState(false);
  const router = useRouter();
  const { userIsPresent } = useWeb3();
  const [anonAadhaar] = useAnonAadhaar();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      if (accounts !== undefined) {
        setMetaValid(true);
      }
      return accounts ? accounts : undefined;
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  React.useEffect(() => {
    if (account && anonAadhaar.status === "logged-in") {
      router.push("/home");
    }
  }, [anonAadhaar.status]);

  React.useCallback(() => {
    if (anonAadhaar.status === "logged-in") {
      onSubmit();
    }
  }, [anonAadhaar.status]);

  const onSubmit = async () => {
    if (account) {
      router.push("/signup");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col gap-10 items-center py-5">
      <Image
        src="/images/colork.png"
        alt="color"
        height={1000}
        width={1000}
        className="fixed z-[-10] top-[30%]"
      />
      <main className="flex flex-col items-center gap-8 rounded-2xl max-w-screen-sm mx-auto h-[24rem] md:h-[20rem] p-8">
        <h1 className="font-bold text-4xl font-bol">
          <span className="text-6xl">Welcome to Safe Shop.</span>
          The one place for all your grocery and general needs.
        </h1>
        <p className="text-3xl text-gray-400">
          Identify yourself using Anon Aadhar.
        </p>
      </main>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {connected ? (
          <div className="px-4 py-8">
            <LogInWithAnonAadhaar />
            <div className="flex flex-col items-center gap-4 rounded-2xl max-w-screen-sm mx-auto p-8">
              {/* Render the proof if generated and valid */}
              {anonAadhaar?.status === "logged-in" && (
                <>
                  <p>✅ Proof is valid</p>
                  <p>Got your Aadhaar Identity Proof</p>
                  <>Welcome anon!</>
                  <AnonAadhaarProof
                    code={JSON.stringify(anonAadhaar.pcd, null, 2)}
                  />
                </>
              )}
            </div>
          </div>
        ) : (
          <Button
            onClick={connect}
            variant="ghost"
            size="lg"
            className="text-lg rounded-md bg-white/50 mt-[50%] backdrop-blur-md"
          >
            <Image
              src="/images/metamask-logo.svg"
              height={50}
              width={140}
              alt={"Metamask logo"}
            />
          </Button>
        )}
      </section>
    </div>
  );
};

export default App;
