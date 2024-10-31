import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('teachers')
export class TeacherEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  last_name: string;

  @Column({ type: 'integer' })
  phone: number;

  @Column({ type: 'varchar' })
  birthDate: Date;

  @Column({ type: 'array' })
  courses: ObjectId[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
