import { Entity, Column } from 'typeorm';
import { ObjectId } from 'mongodb';
import { BaseEntity } from './base-entity';

@Entity('teachers')
export class TeacherEntity extends BaseEntity {
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
}
