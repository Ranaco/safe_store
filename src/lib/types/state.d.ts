import * as React from "react";
import { UserType } from ".";

type AppContextType = {
  state: AppContextValue;
  setState: React.Dispatch<React.SetStateAction<AppContextValue>>;
};

type AppContextValue = {
  address: string;
  user?: UserType;
};
