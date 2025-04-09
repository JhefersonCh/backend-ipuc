import { PanelUC } from './../../uc/panel.uc';

import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('panel')
@ApiTags('Panel de Administrador')
export class PanelController {
  constructor(private readonly panelUc: PanelUC) {}

  @Get()
  async get() {
    return 'Funcionando';
  }
}
