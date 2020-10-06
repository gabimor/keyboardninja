import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ObjectId } from "mongodb";

@Schema({ collection: "user_apps" })
export class UserApps extends Document {
  @Prop()
  _id: ObjectId;

  @Prop(
    raw([
      {
        shortcutIds: [{ type: ObjectId }],
      },
    ])
  )
  apps: UserApp[];
}

type UserApp = {
  _id: ObjectId;
  shortcutIds: ObjectId[];
};

export const UserAppsSchema = SchemaFactory.createForClass(UserApps);
