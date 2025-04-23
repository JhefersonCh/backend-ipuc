import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Configuration } from '../entities/configuration.entity';

@Injectable()
export class ConfigurationRepository extends Repository<Configuration> {
  constructor(dataSource: DataSource) {
    super(Configuration, dataSource.createEntityManager());
  }
}
