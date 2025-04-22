import { Injectable } from '@nestjs/common';
import { PanelService } from '../services/panel.service';

@Injectable()
export class PanelUC {
  constructor(private readonly panelService: PanelService) {}

  async updateHeroImage() {
    return await this.panelService.updateHeroImage();
  }
}
