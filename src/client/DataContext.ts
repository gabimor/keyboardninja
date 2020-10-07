import React from "react";
import { OSs } from "@src/types/OSs.enum";
import { JwtUser } from "@src/types/User.type";
import { App } from "@src/types/schemas/App.schema";
import { AppCategory } from "@src/types/schemas/AppCategory.schema";
import { DoToggleStar, DoSetOs } from "@src/client";

export interface IDataContext {
  appCategories?: AppCategory[];
  app?: Partial<App>;
  os?: OSs;
  user?: JwtUser;
  doToggleStar?: DoToggleStar;
  doSetOs?: DoSetOs;
  doLogout?: () => void;
}

export const DataContext = React.createContext<IDataContext>(undefined);
