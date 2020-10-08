import React from "react";
import { Store } from "./store";

export const DataContext = React.createContext<Partial<Store>>(undefined);
