import { MailReSenderAction } from "./action/MailReSenderAction";
import { MailSenderAnnivAction } from "./action/MailSenderAnnivAction";
import { MailSenderAction } from "./action/MailSenderBirthdayAction";
import { MailSenderWorkerAction } from "./action/MailSenderWorkerAction";
import { MailReSenderActionInterface } from "./action/contract/MailReSenderActionInterface";
import { MailSenderAnnivActionInterface } from "./action/contract/MailSenderAnnivActionInterface";
import { MailSenderBirthdayActionInterface } from "./action/contract/MailSenderBirthdayActionInterface";
import { MailSenderWorkerActionInterface } from "./action/contract/MailSenderWorkerActionInterface";
import { MailServiceInterface } from "./contract/MailServiceInterface";

/**
 * Class MailService
 */
export class MailService implements MailServiceInterface {
    protected senderBirthdayAction: MailSenderBirthdayActionInterface;
    protected senderAnnivAction: MailSenderAnnivActionInterface;
    protected senderWorkerAction: MailSenderWorkerActionInterface;
    protected reSenderAction: MailReSenderActionInterface;

    /**
     * Constructor
     */
    constructor() {
        this.senderBirthdayAction = new MailSenderAction();
        this.senderAnnivAction = new MailSenderAnnivAction();
        this.senderWorkerAction = new MailSenderWorkerAction();
        this.reSenderAction = new MailReSenderAction();
    }
    
    /**
     * 
     * @param mailAction
     * @param date
     * @returns
     */
    async sendMailBirthday(
        mailAction: string, 
        date: string
    ): Promise<void> {
        return await this.senderBirthdayAction.process(mailAction, date);
    }

    /**
     * 
     * @param mailAction
     * @param date
     * @returns
     */
    async sendMailAnniv(
        mailAction: string, 
        date: string
    ): Promise<void> {
        return await this.senderBirthdayAction.process(mailAction, date);
    }

    /**
     * 
     * @param data
     */
    async mailWorker(data: any): Promise<void> {
        await this.senderWorkerAction.process(data);
    }

    /**
     * 
     * @param request
     * @returns
     */
    async reSendMail(request: any): Promise<any> {
        return await this.reSenderAction.process(request);
    }
}