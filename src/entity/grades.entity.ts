import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base-entity';
import { ObjectId } from 'mongodb';

@Entity('grades')
export class GradesEntity extends BaseEntity {
  @Column()
  studentId: ObjectId;

  @Column({ type: 'integer' })
  amount: number;

  @Column({ type: 'date' })
  paymentMethod: Date;
}
