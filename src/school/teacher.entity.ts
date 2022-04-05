import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Subject } from './subject.entity';
import { Document, Schema as mongooseSchema } from 'mongoose';

export type TeacherDocument = Teacher & Document;

@Schema()
export class Teacher {
  @Prop()
  name: string;

  @Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: 'Subject' }] })
  subjects: Subject[];
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
