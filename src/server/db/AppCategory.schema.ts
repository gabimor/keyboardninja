import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "app_categories" })
export class AppCategory extends Document {
  @Prop()
  name: string;

  @Prop()
  icon: string;

  @Prop(
    raw([
      {
        name: { type: String },
        icon: { type: String },
      },
    ])
  )
  apps: string;
}

export const AppCategorySchema = SchemaFactory.createForClass(AppCategory);
