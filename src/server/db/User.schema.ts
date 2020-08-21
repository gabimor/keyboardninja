import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserType } from "src/types/User.type";

@Schema()
export class User extends Document {
  @Prop()
  email: UserType["email"];

  @Prop()
  password: UserType["password"];
}

export const UserSchema = SchemaFactory.createForClass(User);
