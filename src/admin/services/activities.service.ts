import { ActivityRepository } from './../../shared/repositories/activity.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ActivitiesService {
  constructor(private readonly activityRepository: ActivityRepository) {}

  async getActivities() {
    return await this.activityRepository.find();
  }
}
