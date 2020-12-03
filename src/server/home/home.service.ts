import { Injectable } from "@nestjs/common";
import { InjectSendGrid, SendGridService } from "@ntegral/nestjs-sendgrid";
import * as consts from "@shared/consts";

@Injectable()
export class HomeService {
  constructor(@InjectSendGrid() private readonly sendGrid: SendGridService) {}

  async sendEmail(from: string, subject: string, message: string) {
    return this.sendGrid.send({
      from: consts.CONTACT_EMAIL_FROM,
      to: consts.CONTACT_EMAIL_TO,
      subject,
      text: message + `From: ${from}`,
      html: message + `<div>From: ${from}</div>`,
    });
  }
}
