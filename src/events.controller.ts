import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import { Event } from './event.entity';
import { CreateEventDto } from './create-event.dto';
import { UpdatedEventDto } from './update-event.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('/events')
export class EventsController {
  constructor(
    @InjectRepository(Event) private readonly repository: Repository<Event>,
  ) {}

  // Ideal tener 5 acciones máximo
  // Esto ya que se debe trabajar con recursos tipo RESTful
  @Get()
  async findAll() {
    return this.repository.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Event | undefined> {
    return await this.repository.findOne(id);
  }

  // best practice for post and update is to return the value created/updated
  // ValidationPide checks with decorators
  @Post()
  async create(@Body(ValidationPipe) input: CreateEventDto): Promise<Event> {
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
    await this.repository.remove(event);
  }
}
