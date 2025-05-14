import { Injectable } from '@nestjs/common';
import { MailTemplateService } from './mail-template.service';
import { MailsService } from './mails.service';
import { User } from '../entities/user.entity';

@Injectable()
export class MailerGeneratorService {
  constructor(
    private readonly mailTemplateService: MailTemplateService,
    private readonly mailService: MailsService,
  ) {}

  async assignTaskMail(user: User) {
    const body = this.mailTemplateService.assignTaskTemplate(user);
    await this.mailService.sendEmail({
      subject: 'Tarea asignada',
      body,
      to: user.email,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async withTasksPendingMail(payload: any) {
    const body = this.mailTemplateService.withTasksPendingTemplate(payload);
    await this.mailService.sendEmail({
      subject: 'Tareas pendientes',
      body,
      to: payload.email,
    });
  }

  async sendPqrEmail(email: string, name: string, body: string) {
    await this.mailService.sendEmail({
      subject: `PQRs - ${name ? name : ''} - ${email}`,
      body,
      from: email,
      to: 'projectzen.infousers@gmail.com',
    });
  }
}
