import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Activity' })
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  imageUrl: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  publicId: string;
}
