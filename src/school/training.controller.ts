import { Controller, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subject, SubjectDocument } from './subject.entity';
import { Teacher, TeacherDocument } from './teacher.entity';

@Controller('school')
export class TrainingController {
  constructor(
    @InjectModel(Subject.name)
    private readonly subjectModel: Model<SubjectDocument>,
    @InjectModel(Teacher.name)
    private readonly teacherRepository: Model<TeacherDocument>,
  ) {}

  @Post('/create')
  public async savingRelation() {
    const subject = new this.subjectModel();
    subject.name = 'Math';

    // const subject = await this.subjectModel.findOne(3);

    const teacher1 = new this.teacherRepository();
    teacher1.name = 'John Doe';

    const teacher2 = new this.teacherRepository();
    teacher2.name = 'Harry Doe';

    subject.teachers = [teacher1, teacher2];
    this.teacherRepository.bulkSave([teacher1, teacher2]);

    subject.save();

    // How to use One to One
    // const user = new User();
    // const profile = new Profile();

    // user.profile = profile;
    // user.profile = null;
    // Save the user here

    // const teacher1 = await this.teacherRepository.findOne(5);
    // const teacher2 = await this.teacherRepository.findOne(6);

    // return await this.subjectModel
    //   .createQueryBuilder()
    //   .relation(Subject, 'teachers')
    //   .of(subject)
    //   .add([teacher1, teacher2]);
  }

  @Post('/remove')
  public async removingRelation() {
    // const subject = await this.subjectRepository.findOne(
    //   1,
    //   { relations: ['teachers'] }
    // );
    // subject.teachers = subject.teachers.filter(
    //   teacher => teacher.id !== 2
    // );
    // await this.subjectRepository.save(subject);
    // await this.subjectModel
    //   .createQueryBuilder('s')
    //   .update()
    //   .set({ name: 'Confidential' })
    //   .execute();
  }
}
