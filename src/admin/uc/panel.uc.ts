import { Injectable } from '@nestjs/common';
import { PanelService } from '../services/panel.service';
import { ActivityModel } from '../models/activity.model';
import { ConfigurationModel } from '../models/configuration.model';
import { ActivitiesService } from '../services/activities.service';

@Injectable()
export class PanelUC {
  constructor(
    private readonly panelService: PanelService,
    private readonly activitiesService: ActivitiesService,
  ) {}

  async createActivity(activity: ActivityModel) {
    return await this.panelService.createActivity(activity);
  }

  async updateActivity(activity: ActivityModel) {
    return await this.panelService.updateActivity(activity);
  }

  async deleteActivity(id: string) {
    return await this.panelService.deleteActivity(id);
  }

  async updateConfiguration(configuration: ConfigurationModel) {
    return await this.panelService.updateConfiguration(configuration);
  }

  async getConfiguration() {
    return await this.panelService.getConfiguration();
  }

  async getActivities() {
    return await this.activitiesService.getActivities();
  }
}
