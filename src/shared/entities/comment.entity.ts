import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity({ name: 'Comment' })
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', {
    nullable: false,
  })
  userId: string;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @Column('uuid', {
    nullable: false,
  })
  postId: string;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  post: Post;

  @Column('varchar', {
    length: 2000,
    nullable: false,
  })
  content: string;

  @Column('uuid', {
    nullable: true,
  })
  parentId: string;

  @ManyToOne(() => Comment, (comment) => comment.replies, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parent: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  replies: Comment[];

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt?: Date;
}
