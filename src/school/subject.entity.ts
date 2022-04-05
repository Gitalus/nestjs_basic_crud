import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Teacher } from './teacher.entity';
import { Document, Schema as mongooseSchema } from 'mongoose';

export type SubjectDocument = Subject & Document;

@Schema()
export class Subject {
  @Prop()
  name: string;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: 'Teacher' }],
  })
  teachers: Teacher[];
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
