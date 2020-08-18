import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as Schema2 } from "mongoose";
import { Section } from "./Section";
import { Shortcut } from "./Shortcut";

@Schema({ collection: "apps" })
export class App extends Document {
  @Prop()
  name: string;

  @Prop()
  url: string;

  @Prop()
  icon: string;

  @Prop(
    raw([
      {
        name: { type: String },
      },
    ])
  )
  sections: Section[];
  oss: string[];
  @Prop(
    raw([
      {
        action: { type: String },
        sectionId: { type: Schema2.Types.ObjectId },
        pins: { type: Number },
        win: { type: String },
        mac: { type: String },
        isHtml: { type: Boolean },
        note: { type: String },
      },
    ])
  )
  shortcuts: Shortcut[];
}

export const AppSchema = SchemaFactory.createForClass(App);
