import * as React from "react";

type AppContextType = {
  state: AppContextValue;
  setState: React.Dispatch<React.SetStateAction<AppContextValue>>;
};

type AppContextValue = {
  address: string;
};
