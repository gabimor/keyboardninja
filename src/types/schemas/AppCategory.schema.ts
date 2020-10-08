import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { App } from "./App.schema";

@Schema({ collection: "app_categories" })
export class AppCategory extends Document {
  @Prop()
  name: string;

  @Prop()
  gridArea: string;

  @Prop(
    raw([
      {
        name: { type: String },
        icon: { type: String },
      },
    ])
  )
  apps: App[];
}

export const AppCategorySchema = SchemaFactory.createForClass(AppCategory);
