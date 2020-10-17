import * as React from "react";
import { Store } from "./store";

export const DataContext = React.createContext<Store>(undefined);
