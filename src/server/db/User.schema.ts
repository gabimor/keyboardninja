import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export interface User {
  email: string;
  password: string;
}

@Schema()
export class User extends Document {
  @Prop()
  email: User["email"];

  @Prop()
  password: User["password"];
}

export const UserSchema = SchemaFactory.createForClass(User);
