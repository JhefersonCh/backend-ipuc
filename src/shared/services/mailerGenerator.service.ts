import { Injectable } from '@nestjs/common';
import { MailTemplateService } from './mail-template.service';
import { MailsService } from './mails.service';

@Injectable()
export class MailerGeneratorService {
  constructor(
    private readonly mailTemplateService: MailTemplateService,
    private readonly mailService: MailsService,
  ) {}

  async sendPqrEmail(email: string, name: string, body: string) {
    await this.mailService.sendEmail({
      subject: `PQRs - ${name ? name : ''} - ${email}`,
      body,
      from: email,
      to: 'projectzen.infousers@gmail.com',
    });
  }
}
