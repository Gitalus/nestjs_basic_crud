import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

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

  @Post()
  create(@Body() input: unknown) {
    return input;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() input: unknown) {
    return ['hola'];
  }

  @Delete('id')
  remove(@Param('id') id: string) {}
}
