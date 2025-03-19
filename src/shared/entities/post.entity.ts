import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';

@Entity({ name: 'Post' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 100,
    nullable: false,
  })
  title: string;

  @Column('varchar', {
    length: 2000,
    nullable: false,
  })
  description: string;

  @Column('uuid', {
    nullable: false,
  })
  userId: string;

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  updatedAt?: Date;

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
