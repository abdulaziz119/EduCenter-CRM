import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base-entity';

@Entity('courses')
export class CourseEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'integer', nullable: true })
  monthlyFee?: number;

  @Column({ type: 'varchar', nullable: true })
  duration?: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
