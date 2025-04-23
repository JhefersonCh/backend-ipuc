import { Injectable } from '@nestjs/common';
import { PanelService } from '../services/panel.service';
import { ActivityModel } from '../models/activity.model';
import { ConfigurationModel } from '../models/configuration.model';

@Injectable()
export class PanelUC {
  constructor(private readonly panelService: PanelService) {}

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
}
