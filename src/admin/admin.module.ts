import { Module } from '@nestjs/common';
import { PanelController } from './controllers/panel/panel.controller';
import { PanelService } from './services/panel.service';
import { PanelUC } from './uc/panel.uc';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [PanelController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SharedModule.forRoot(),
  ],
  providers: [PanelService, PanelUC],
})
export class AdminModule {}
