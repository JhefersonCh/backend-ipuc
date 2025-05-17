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
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
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
    nullable: true,
  })
  imageUrl: string;

  @Column({
    nullable: true,
  })
  publicId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
