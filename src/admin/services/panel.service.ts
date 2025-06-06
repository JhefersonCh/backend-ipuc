import { ResponsePaginationDto } from './../../shared/dtos/pagination.dto';
import { PageMetaDto } from './../../shared/dtos/pageMeta.dto';
import { EventRepository } from './../../shared/repositories/event.repository';
import { ConfigurationRepository } from './../../shared/repositories/configuration.repository';
import { ActivityRepository } from './../../shared/repositories/activity.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ActivityModel, EventModel } from '../models/activity.model';
import { ConfigurationModel } from '../models/configuration.model';
import { PaginatedListEventsParamsDto } from '../dtos/activity.dto';
import { Between, ILike } from 'typeorm';

@Injectable()
export class PanelService {
  constructor(
    private readonly activityRepository: ActivityRepository,
    private readonly configurationRepository: ConfigurationRepository,
    private readonly eventRepository: EventRepository,
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
    const existingConfiguration = await this.configurationRepository.findOne({
      where: { id: 1 },
    });
    if (!existingConfiguration) {
      return await this.configurationRepository.insert({
        ...this.defaultConfiguration(),
        ...configuration,
        id: 1,
      });
    }
    return await this.configurationRepository.update(
      { id: 1 },
      { ...configuration, id: 1 },
    );
  }

  defaultConfiguration() {
    return {
      heroUrl: '',
      heroPublicId: '',
      title: '',
      description: '',
      name: '',
      additionalTitle: '',
      additionalDescription: '',
      enableRedirectToIpuc: false,
      mission: '',
      vision: '',
      ubicationUrl: '',
      ubicationCoordinates: '',
      enableRedirectToGoogleMaps: false,
      appName: '',
      logoUrl: '',
      logoPublicId: '',
    };
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

  async findEvemts() {
    return await this.eventRepository.find();
  }

  async eventsPaginatedList(params: PaginatedListEventsParamsDto) {
    const skip = (params.page - 1) * params.perPage;
    const where = {};

    params.activityId &&
      Object.assign(where, { activityId: params.activityId });
    params.title && Object.assign(where, { title: ILike(`%${params.title}%`) });
    params.description &&
      Object.assign(where, { description: ILike(`%${params.description}%`) });
    params.initDate &&
      params.endDate &&
      Object.assign(where, { date: Between(params.initDate, params.endDate) });

    let finalWhere = where;

    if (params.search) {
      finalWhere = [
        { ...where, title: ILike(`%${params.search}%`) },
        { ...where, description: ILike(`%${params.search}%`) },
      ];
    }

    const [entities, itemCount] = await this.eventRepository.findAndCount({
      where: finalWhere,
      skip,
      take: params.perPage,
      order: { createdAt: params.order },
    });

    const pageMeta = new PageMetaDto({ itemCount, pageOptionsDto: params });

    return new ResponsePaginationDto(entities, pageMeta);
  }

  async findById(id: string) {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException('El evento no existe.');
    }
    return event;
  }

  async updateEvent(event: EventModel): Promise<void> {
    await this.findById(event.id);
    await this.eventRepository.save(event);
  }

  async deleteEvent(id: string): Promise<void> {
    await this.findById(id);
    await this.eventRepository.delete(id);
  }

  async createEvent(event: EventModel): Promise<{ rowId: string }> {
    return (await this.eventRepository.insert(event)).identifiers[0].id;
  }
}
