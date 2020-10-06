import { User } from "@src/types/schemas/User.schema";
import { Request } from "express";

export type RequestAuth = Request & { user?: Partial<User> };
