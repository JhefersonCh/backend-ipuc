import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Activity } from '../entities/activity.entity';

@Injectable()
export class ActivityRepository extends Repository<Activity> {
  constructor(dataSource: DataSource) {
    super(Activity, dataSource.createEntityManager());
  }
}
