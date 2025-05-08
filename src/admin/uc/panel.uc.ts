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

  async getActivities() {
    return await this.activitiesService.getActivities();
  }

  async getHome() {
    return await this.panelService.getHome();
  }

  async updateConfiguration(configuration: Partial<ConfigurationModel>) {
    return await this.panelService.updateConfiguration(configuration);
  }

  async getAbout() {
    return await this.panelService.getAbout();
  }

  async getGeneralInfo() {
    return await this.panelService.getGeneralInfo();
  }
}
