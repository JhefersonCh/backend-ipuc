import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Activity } from './activity.entity';

@Entity('Event')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  title: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 1000,
  })
  description: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  date: Date;

  @Column({
    nullable: false,
  })
  activityId: string;

  @ManyToOne(() => Activity, (activity) => activity.events, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  activity: Activity;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  imageUrl: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
  })
  publicId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
