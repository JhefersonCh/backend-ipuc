import { ProfileService } from './../services/user/profile.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileUseCase {
  constructor(private readonly profileService: ProfileService) {}

  async getStatistics(id: string) {
    return await this.profileService.getStatistics(id);
  }
}
