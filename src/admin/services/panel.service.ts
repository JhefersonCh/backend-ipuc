import { ConfigurationRepository } from './../../shared/repositories/configuration.repository';
import { ActivityRepository } from './../../shared/repositories/activity.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ActivityModel } from '../models/activity.model';
import { ConfigurationModel } from '../models/configuration.model';

@Injectable()
export class PanelService {
  constructor(
    private readonly activityRepository: ActivityRepository,
    private readonly configurationRepository: ConfigurationRepository,
  ) {}

  async createActivity(activity: ActivityModel): Promise<{ rowId: string }> {
    return (await this.activityRepository.insert(activity)).identifiers[0].id;
  }

  async updateActivity(activity: ActivityModel) {
    const existingActivity = await this.activityRepository.findOne({
      where: { id: activity.id },
    });
    if (!existingActivity) {
      throw new NotFoundException('La actividad no existe.');
    }
    return await this.activityRepository.save(activity);
  }

  async deleteActivity(id: string) {
    const existingActivity = await this.activityRepository.findOne({
      where: { id },
    });
    if (!existingActivity) {
      throw new NotFoundException('La actividad no existe.');
    }
    return await this.activityRepository.delete(id);
  }

  async updateConfiguration(configuration: ConfigurationModel) {
    return await this.configurationRepository.update(
      configuration.id,
      configuration,
    );
  }

  async getConfiguration() {
    return await this.configurationRepository.find()[0];
  }
}
