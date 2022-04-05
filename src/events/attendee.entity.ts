import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Event } from './event.entity';
import { Document, Schema as mongooseSchema } from 'mongoose';

export type AttendeeDocument = Attendee & Document;

export enum AttendeeAnswerEnum {
  Accepted = 1,
  Maybe,
  Rejected,
}

@Schema()
export class Attendee {
  @Prop()
  name: string;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Event' })
  event: Event;

  @Prop({
    type: mongooseSchema.Types.Number,
    default: AttendeeAnswerEnum.Accepted,
  })
  answer: AttendeeAnswerEnum;
}

export const AttendeeSchema = SchemaFactory.createForClass(Attendee);
