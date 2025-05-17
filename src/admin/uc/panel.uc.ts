import { Injectable } from '@nestjs/common';
import { PanelService } from '../services/panel.service';
import { ActivityModel, EventModel } from '../models/activity.model';
import { ConfigurationModel } from '../models/configuration.model';
import { ActivitiesService } from '../services/activities.service';
import { PaginatedListEventsParamsDto } from '../dtos/activity.dto';

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

  async getEvents() {
    return await this.panelService.findEvemts();
  }

  async createEvent(event: EventModel) {
    return await this.panelService.createEvent(event);
  }

  async updateEvent(event: EventModel) {
    return await this.panelService.updateEvent(event);
  }

  async deleteEvent(id: string) {
    return await this.panelService.deleteEvent(id);
  }

  async eventsPaginatedList(query: PaginatedListEventsParamsDto) {
    return await this.panelService.eventsPaginatedList(query);
  }

  async getEvent(id: string) {
    return await this.panelService.findById(id);
  }
}
