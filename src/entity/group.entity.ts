import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('groups')
export class GroupEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'array' })
  students: ObjectId[];

  @Column({ type: 'array' })
  teachers: ObjectId[];

  @Column({ type: 'array' })
  courses: ObjectId[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
