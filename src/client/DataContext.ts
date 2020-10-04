import React, { Dispatch, SetStateAction } from "react";
import { OSs } from "@src/types/OSs.enum";
import { JwtUser, UserType } from "@src/types/User.type";
import { App } from "@server/app/App.schema";
import { AppCategory } from "@server/app/AppCategory.schema";
import { DoPin, DoSetOs } from "@src/client";

export interface IDataContext {
  appCategories?: AppCategory[];
  app?: Partial<App>;
  os?: OSs;
  user?: JwtUser;
  doPin?: DoPin;
  doSetOs?: DoSetOs;
  doLogout?: () => void;
}

export const DataContext = React.createContext<IDataContext>(undefined);
