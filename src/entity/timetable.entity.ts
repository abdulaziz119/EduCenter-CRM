import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('timetable')
export class TimetableEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ type: 'varchar' })
  date: Date;

  @Column({ type: 'varchar' })
  lesson: string;

  @Column()
  groupId: ObjectId;

  @Column()
  teacherId: ObjectId;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
