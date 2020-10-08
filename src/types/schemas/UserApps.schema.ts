import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ObjectId } from "mongodb";

@Schema({ collection: "user_apps" })
export class UserApps extends Document {
  @Prop()
  userId: ObjectId;
  @Prop()
  appId: ObjectId;

  @Prop()
  shortcutIds: ObjectId[];
}

export const UserAppsSchema = SchemaFactory.createForClass(UserApps);
