import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';

@Entity({ name: 'User' })
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 50,
    nullable: false,
  })
  firstName: string;

  @Column('varchar', {
    length: 50,
    nullable: false,
  })
  lastName: string;

  @Column('varchar', {
    length: 10,
    nullable: false,
  })
  role: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  email: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  password: string;

  @Column('varchar', {
    length: 25,
    nullable: false,
  })
  username: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  updatedAt?: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
