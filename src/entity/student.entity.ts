import { Entity, Column } from 'typeorm';
import { ObjectId } from 'mongodb';
import { BaseEntity } from './base-entity';

@Entity('students')
export class StudentEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  last_name: string;

  @Column({ type: 'integer', unique: true })
  phone: number;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  birthDate: Date;

  @Column({ type: 'boolean', default: false })
  isPaid: boolean;

  @Column()
  groupId: ObjectId;
}
