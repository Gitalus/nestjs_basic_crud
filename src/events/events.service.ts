import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './event.entity';
import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Attendee, AttendeeAnswerEnum } from './attendee.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name)
    private readonly eventsRepository: Model<EventDocument>,
  ) {}

  private getAttendeeAssistanceCount(attendees: Attendee[]): {
    accepted: number;
    rejected: number;
    maybe: number;
  } {
    const mappedCount = attendees.reduce((accObject, attendee: Attendee) => {
      accObject[AttendeeAnswerEnum[attendee.answer]] ??= 0;
      accObject[AttendeeAnswerEnum[attendee.answer]] += 1;

      return accObject;
    }, {});

    return mappedCount as {
      accepted: number;
      rejected: number;
      maybe: number;
    };
  }

  public async getEventWithAttendeeCount(
    id: Types.ObjectId,
  ): Promise<Event | undefined> {
    const event = await this.getEvent(id);
    event.attendeesCount = event.attendess.length;

    const attendeCounts = this.getAttendeeAssistanceCount(event.attendess);

    event.attendeeAccepted = attendeCounts.accepted;
    event.attendeeMaybe = attendeCounts.maybe;
    event.attendeeRejected = attendeCounts.rejected;

    return event;
  }

  public async getEvent(id: Types.ObjectId): Promise<Event | null> {
    return await this.eventsRepository
      .findById(id)
      .populate('attendess')
      .lean();
  }
}
