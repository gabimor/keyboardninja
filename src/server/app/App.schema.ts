import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseNativeSchema } from "mongoose";
import { OSs } from "@src/types/OSs.enum";
import { Section } from "@src/types/Section.type";
import { Shortcut } from "@src/types/Shortcut.type";

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
        sectionId: { type: MongooseNativeSchema.Types.ObjectId },
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
