import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Event {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  when: Date;

  @Column()
  address: string;
}
