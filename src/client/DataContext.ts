import React from "react";
import { OSs } from "@src/types/OSs.enum";
import { UserType } from "@src/types/User.type";
import { App } from "@server/app/App.schema";
import { AppCategory } from "@server/app/AppCategory.schema";
import { DoPin, DoSetOs } from "@src/client";

export interface IDataContext {
  appCategories?: AppCategory[];
  app?: App;
  os?: OSs;
  user?: UserType;
  doLogin?: (user: UserType) => void;
  doLogout?: () => void;
  doPin?: DoPin;
  doSetOs?: DoSetOs;
}

export const DataContext = React.createContext<IDataContext>(undefined);
