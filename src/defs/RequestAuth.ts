import { Store } from "@client/store";
import { Request } from "express";
import { JwtUser } from "./User.type";

export type RequestAuth = Request & {
  user?: JwtUser;
  context?: Partial<Store>;
};
