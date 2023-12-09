import * as React from "react";
import type { NextRouter } from "next/router";
import Head from "next/head";
import BottomNavbar from "../bottom-navbar";

interface MainProps {
  router: NextRouter;
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children, router }) => {
  return (
    <div className="h-screen w-screen">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale = 1.0"
        />
        <meta name="author" content="Ranaco" />
        <meta name="author" content="https://github.com/Ranaco" />
        <title>SafeShop</title>
      </Head>
      <div className="h-full w-full">
        <div className="px-4 pt-10 h-[95vh]">{children}</div>
        <BottomNavbar router={router} />
      </div>
    </div>
  );
};

export default Main;
