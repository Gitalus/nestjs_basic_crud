import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './event.entity';
import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name)
    private readonly eventsRepository: Model<EventDocument>,
  ) {}

  public async getEventWithAttendeeCount(
    id: Types.ObjectId,
  ): Promise<Event | undefined> {
    const event = await this.getEvent(id);
    event.attendessCount = event.attendess.length;

    return event;
  }

  public async getEvent(id: Types.ObjectId): Promise<Event | null> {
    return await this.eventsRepository
      .findById(id)
      .populate('attendess')
      .lean();
  }
}
