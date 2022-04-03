import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Attendee } from './attendee.entity';
import { Document, Schema as mongooseSchema } from 'mongoose';

export type EventDocument = Event & Document;
@Schema()
export class Event {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  when: Date;

  @Prop()
  address: string;

  // @OneToMany(() => Attendee, (attendee) => attendee.event)
  @Prop({ type: [mongooseSchema.Types.ObjectId], ref: 'Attendee' })
  attendess: Attendee[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
