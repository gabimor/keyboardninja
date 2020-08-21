import React from "react";
import { OSs } from "../server/db/OSs";
import { User } from "../server/db/User.schema";
import { App } from "../server/db/App.schema";
import { AppCategory } from "../server/db/AppCategory.schema";
import { DoPin, DoSetOs } from "src/client";

export interface IDataContext {
  appCategories?: AppCategory[];
  app?: App;
  os?: OSs;
  user?: User;
  doLogin?: (user: User) => void;
  doLogout?: () => void;
  doPin?: DoPin;
  doSetOs?: DoSetOs;
}

export const DataContext = React.createContext<IDataContext>(undefined);
