import { IsDateString, IsString, Length } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @Length(5, 255) // Googlear validator decorator
  name: string;

  @Length(5, 255)
  description: string;

  @IsDateString()
  when: string;

  @Length(5, 255)
  address: string;
}
