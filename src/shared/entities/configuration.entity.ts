import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Configuration' })
export class Configuration {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  @Column({ type: 'varchar', length: 100, nullable: false })
  logoUrl: string;
  @Column({ type: 'varchar', length: 50, nullable: false })
  logoPublicId: string;
  @Column({ type: 'varchar', length: 100, nullable: false })
  heroUrl: string;
  @Column({ type: 'varchar', length: 50, nullable: false })
  heroPublicId: string;
  @Column({ type: 'varchar', length: 50, nullable: false })
  title: string;
  @Column({ type: 'varchar', length: 200, nullable: false })
  description: string;
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;
  @Column({ type: 'varchar', length: 100, nullable: false })
  additionalTitle: string;
  @Column({ type: 'varchar', length: 2000, nullable: false })
  additionalDescription: string;
  @Column({ type: 'boolean', nullable: false })
  enableRedirectToIpuc: boolean;
  @Column({ type: 'varchar', length: 2000, nullable: false })
  mission: string;
  @Column({ type: 'varchar', length: 2000, nullable: false })
  vision: string;
  @Column({ type: 'varchar', length: 500, nullable: false })
  ubicationUrl: string;
  @Column({ type: 'varchar', length: 100, nullable: false })
  ubicationCoordinates: string;
  @Column({ type: 'boolean', nullable: false })
  enableRedirectToGoogleMaps: boolean;
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    default: 'Iglesia Pentecostal Unida de Colombia - Sede Cuarta.',
  })
  appName: string;
}
