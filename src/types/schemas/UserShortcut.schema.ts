import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "user_shortcuts" })
export class UserShortcut extends Document {
  @Prop()
  userId: string;

  @Prop()
  appId: string;

  @Prop()
  shortcuts: [string];
}

export const UserShortcutSchema = SchemaFactory.createForClass(UserShortcut);
