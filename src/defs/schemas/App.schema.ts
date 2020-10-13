import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { OSs } from "@defs/OSs.enum";
import { Section } from "@defs/Section.type";
import { Shortcut } from "@defs/Shortcut.type";
import { ObjectId } from "mongodb";

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
  oss: OSs[];
  @Prop(
    raw([
      {
        action: { type: String },
        sectionId: { type: ObjectId },
        stars: { type: Number },
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
