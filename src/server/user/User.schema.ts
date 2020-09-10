import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserType } from "@src/types/User.type";

@Schema()
export class User extends Document {
  @Prop()
  email: UserType["email"];

  @Prop()
  password?: UserType["password"];

  @Prop()
  firstName?: UserType["firstName"];

  @Prop()
  lastName?: UserType["lastName"];

  @Prop()
  facebookId?: UserType["facebookId"];
  
  @Prop()
  googleId?: UserType["googleId"];
}

export const UserSchema = SchemaFactory.createForClass(User);
