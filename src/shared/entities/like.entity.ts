import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity({ name: 'Like' })
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', {
    nullable: false,
  })
  userId: string;

  @ManyToOne(() => User, (user) => user.likes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @Column('uuid', {
    nullable: false,
  })
  postId: string;
  @ManyToOne(() => Post, (post) => post.likes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  post: Post;
}
