import { Module } from '@nestjs/common';
import { PanelController } from './controllers/panel/panel.controller';
import { PanelService } from './services/panel.service';
import { PanelUC } from './uc/panel.uc';

@Module({
  controllers: [PanelController],
  providers: [PanelService, PanelUC],
})
export class AdminModule {}
