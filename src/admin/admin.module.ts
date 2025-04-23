import { ConfigurationRepository } from './../shared/repositories/configuration.repository';
import { Configuration } from './../shared/entities/configuration.entity';
import { Activity } from './../shared/entities/activity.entity';
import { ActivityRepository } from './../shared/repositories/activity.repository';
import { Module } from '@nestjs/common';
import { PanelController } from './controllers/panel/panel.controller';
import { PanelService } from './services/panel.service';
import { PanelUC } from './uc/panel.uc';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from 'src/shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PanelController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SharedModule.forRoot(),
    TypeOrmModule.forFeature([Activity, Configuration]),
  ],
  providers: [
    PanelService,
    PanelUC,
    ActivityRepository,
    ConfigurationRepository,
  ],
})
export class AdminModule {}
