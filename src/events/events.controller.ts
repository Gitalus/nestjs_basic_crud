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

import { Event } from './event.entity';
import { CreateEventDto } from './create-event.dto';
import { UpdatedEventDto } from './update-event.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// @UsePipes(ValidationPipe) Can be used on action level o class level, the validator must be inside
@Controller('/events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(
    @InjectRepository(Event) private readonly repository: Repository<Event>,
  ) {}

  // Ideal tener 5 acciones máximo
  // Esto ya que se debe trabajar con recursos tipo RESTful
  @Get()
  async findAll() {
    this.logger.log(`Hit the findAll route`);
    const events = await this.repository.find();
    this.logger.debug(`Found ${events.length} events `);

    return events;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Event | undefined> {
    const event = await this.repository.findOne(id);

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
    return await this.repository.save({
      ...input,
      when: input.when ? new Date(input.when) : new Date(),
    });
  }

  @Patch(':id')
  async update(
    @Param('id' /* , ParseIntPipe */) id: string,
    @Body() input: UpdatedEventDto,
  ) {
    const event = await this.repository.findOne(id);

    if (!event) {
      throw new NotFoundException();
    }
    return await this.repository.save({
      ...event,
      ...input,
      when: input.when ? new Date(input.when) : input.when,
    });
  }

  // best practice for delete is to return nothing but status code 204
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    const event = await this.repository.findOne(id);

    if (!event) {
      throw new NotFoundException();
    }
    await this.repository.remove(event);
  }
}
