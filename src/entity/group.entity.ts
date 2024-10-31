import { Entity, Column } from 'typeorm';
import { ObjectId } from 'mongodb';
import { BaseEntity } from './base-entity';

@Entity('groups')
export class GroupEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'array' })
  students: ObjectId[];

  @Column({ type: 'array' })
  teachers: ObjectId[];

  @Column({ type: 'array' })
  courses: ObjectId[];
}
