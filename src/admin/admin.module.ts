import { UserRepository } from './../shared/repositories/user.repository';
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
import { ActivitiesService } from './services/activities.service';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user.service';
import { UserUC } from './uc/user.uc';

@Module({
  controllers: [PanelController, UserController],
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
    ActivitiesService,
    UserService,
    UserUC,
    UserRepository,
  ],
})
export class AdminModule {}
