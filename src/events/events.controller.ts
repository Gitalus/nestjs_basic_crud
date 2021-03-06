import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { Event, EventDocument } from './event.entity';
import { CreateEventDto } from './create-event.dto';
import { UpdatedEventDto } from './update-event.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Attendee, AttendeeDocument } from './attendee.entity';
import { EventsService } from './events.service';

// @UsePipes(ValidationPipe) Can be used on action level o class level, the validator must be inside
@Controller('/events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(
    @InjectModel(Event.name)
    private readonly eventRepository: Model<EventDocument>,
    @InjectModel(Attendee.name)
    private readonly attendeeRepository: Model<AttendeeDocument>,
    private readonly eventsService: EventsService,
  ) {}

  // Ideal tener 5 acciones máximo
  // Esto ya que se debe trabajar con recursos tipo RESTful
  @Get()
  async findAll() {
    this.logger.log(`Hit the findAll route`);
    const events = await this.eventRepository.find();
    this.logger.debug(`Found ${events.length} events `);

    return events;
  }

  @Get(':id')
  async findOne(@Param('id') id: Types.ObjectId) {
    const event = await this.eventsService.getEventWithAttendeeCount(id);

    if (!event) {
      throw new NotFoundException();
    }
    return event;
  }

  // best practice for post and update is to return the value created/updated
  // ValidationPide checks with decorators
  @Post()
  async create(
    @Body(/* new ValidationPipe({ groups: ['create'] }) */)
    input: CreateEventDto,
  ): Promise<Event> {
    return new this.eventRepository({
      ...input,
      when: input.when ? new Date(input.when) : new Date(),
    }).save();
  }

  @Patch(':id')
  async update(
    @Param('id' /* , ParseIntPipe */) id: string,
    @Body() input: UpdatedEventDto,
  ): Promise<Event> {
    const newEventData = {
      ...input,
      when: input.when ? new Date(input.when) : input.when,
    };

    const event = await this.eventRepository
      .findByIdAndUpdate(id, newEventData)
      .setOptions({ overwrite: true, new: true });

    if (!event) {
      throw new NotFoundException();
    }
    return event;
  }

  // best practice for delete is to return nothing but status code 204
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    const event = await this.eventRepository.findById(id);

    if (!event) {
      throw new NotFoundException();
    }
    await this.eventRepository.remove(event);
  }
}
