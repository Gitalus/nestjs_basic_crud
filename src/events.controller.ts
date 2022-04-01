import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { Event } from './event.entity';
import { UpdatedEventDto } from './update-event.dto';

@Controller('/events')
export class EventsController {
  private events: Event[] = [];

  // Ideal tener 5 acciones máximo
  // Esto ya que se debe trabajar con recursos tipo RESTful
  @Get()
  findAll() {
    return this.events;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Event {
    const event = this.events.find((event) => event.id === Number(id));
    return event;
  }

  // best practice for post and update is to return the value created/updated
  @Post()
  create(@Body() input: CreateEventDto): Event {
    const event = {
      ...input,
      when: new Date(input.when),
      id: this.events.length + 1,
    };
    this.events.push(event);
    return event;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() input: UpdatedEventDto,
  ): Event | undefined {
    const index = this.events.findIndex((event) => event.id === Number(id));

    this.events[index] = {
      ...this.events[index],
      ...input,
      when: input.when ? new Date(input.when) : this.events[index].when,
    };
    return this.events[index];
  }

  // best practice for delete is to return nothing but status code 204
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    this.events = this.events.filter((event) => event.id !== Number(id));
  }
}
