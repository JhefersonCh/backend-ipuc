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

  async getHome() {
    const [homeInfo] = await this.configurationRepository.find();
    return {
      heroUrl: homeInfo.heroUrl,
      heroPublicId: homeInfo.heroPublicId,
      title: homeInfo.title,
      description: homeInfo.description,
      name: homeInfo.name,
      additionalTitle: homeInfo.additionalTitle,
      additionalDescription: homeInfo.additionalDescription,
      enableRedirectToIpuc: homeInfo.enableRedirectToIpuc,
    };
  }

  async updateConfiguration(configuration: Partial<ConfigurationModel>) {
    return await this.configurationRepository.update(
      { id: 1 },
      { ...configuration, id: 1 },
    );
  }

  async getAbout() {
    const [aboutInfo] = await this.configurationRepository.find();
    return {
      mission: aboutInfo.mission,
      vision: aboutInfo.vision,
      ubicationUrl: aboutInfo.ubicationUrl,
      ubicationCoordinates: aboutInfo.ubicationCoordinates,
      enableRedirectToGoogleMaps: aboutInfo.enableRedirectToGoogleMaps,
    };
  }

  async getGeneralInfo() {
    const [generalInfo] = await this.configurationRepository.find();
    return {
      appName: generalInfo.appName,
      logoUrl: generalInfo.logoUrl,
      logoPublicId: generalInfo.logoPublicId,
    };
  }
}
