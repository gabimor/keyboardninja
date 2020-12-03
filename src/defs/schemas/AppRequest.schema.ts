import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "app_request" })
export class AppRequest extends Document {
  @Prop()
  appName: string;

  @Prop()
  votes: number;
}

export const AppRequestSchema = SchemaFactory.createForClass(AppRequest);
