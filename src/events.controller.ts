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
import { UpdatedEventDto } from './update-event.dto';

@Controller('/events')
export class EventsController {
  // Ideal tener 5 acciones máximo
  // Esto ya que se debe trabajar con recursos tipo RESTful
  @Get()
  findAll() {
    return [
      { id: 1, name: 'First Event' },
      { id: 2, name: 'Second Event' },
    ];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return { id, name: 'First Event' };
  }

  // best practice for post and update is to return the value created/updated
  @Post()
  create(@Body() input: CreateEventDto) {
    return input;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() input: UpdatedEventDto) {
    return input;
  }

  // best practice for delete is to return nothing but status code 204
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {}
}
