import * as React from "react";
import { UserType } from ".";

type AppContextType = {
  state: AppContextValue;
  setState: React.Dispatch<React.SetStateAction<AppContextValue>>;
};

type AppContextValue = {
  wallet: string;
  user?: UserType;
  contract: any;
};
