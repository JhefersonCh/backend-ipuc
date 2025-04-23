import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Configuration' })
export class Configuration {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 50, nullable: false })
  logoUrl: string;
  @Column({ type: 'varchar', length: 50, nullable: false })
  logoPublicId: string;
  @Column({ type: 'varchar', length: 50, nullable: false })
  heroUrl: string;
  @Column({ type: 'varchar', length: 50, nullable: false })
  heroPublicId: string;
}
