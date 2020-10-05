import React from "react";
import { OSs } from "@src/types/OSs.enum";
import { JwtUser } from "@src/types/User.type";
import { App } from "@server/app/App.schema";
import { AppCategory } from "@server/app/AppCategory.schema";
import { DoStar, DoSetOs } from "@src/client";

export interface IDataContext {
  appCategories?: AppCategory[];
  app?: Partial<App>;
  os?: OSs;
  user?: JwtUser;
  doStar?: DoStar;
  doSetOs?: DoSetOs;
  doLogout?: () => void;
}

export const DataContext = React.createContext<IDataContext>(undefined);
