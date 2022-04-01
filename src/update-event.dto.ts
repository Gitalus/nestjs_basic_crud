import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';

export class UpdatedEventDto extends PartialType(CreateEventDto) {}
