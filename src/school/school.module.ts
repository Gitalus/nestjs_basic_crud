import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Subject, SubjectSchema } from './subject.entity';
import { Teacher, TeacherSchema } from './teacher.entity';
import { TrainingController } from './training.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subject.name, schema: SubjectSchema },
      { name: Teacher.name, schema: TeacherSchema },
    ]),
  ],
  controllers: [TrainingController],
})
export class SchoolModule {}
