import React from "react";
import { OSs } from "../server/db/oss";
import { IUser } from "../server/db/User.schema";
import { App } from "../server/db/App.schema";
import { AppCategory } from "../server/db/AppCategory.schema";
import { IDoPin, IDoSetOs } from "src/client";

export interface IDataContext {
  appCategories?: AppCategory[];
  app?: App;
  os?: OSs;
  user?: IUser;
  doLogin?: (user: IUser) => void;
  doLogout?: () => void;
  doPin?: IDoPin;
  doSetOs?: IDoSetOs;
}

export const DataContext = React.createContext<IDataContext>(undefined);
