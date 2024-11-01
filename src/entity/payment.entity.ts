import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base-entity';
import { ObjectId } from 'mongodb';

@Entity('payments')
export class PaymentEntity extends BaseEntity {
  @Column({ type: 'integer' })
  grade: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  studentId: ObjectId;

  @Column()
  courseId: ObjectId;
}
