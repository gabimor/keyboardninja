import React from "react";
import { OSs } from "src/server/db/oss";
import { IUser } from "src/server/db/User.schema";
import { App } from "../server/db/App.schema";
import { AppCategory } from "../server/db/AppCategory.schema";

export interface IDataContext {
  appCategories?: AppCategory[];
  app?: App;
  os?: OSs;
  user?: IUser;
}

const DataContext = React.createContext<IDataContext>(undefined);
export default DataContext;
