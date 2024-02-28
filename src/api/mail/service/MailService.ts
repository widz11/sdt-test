import { MailReSenderAction } from "./action/MailReSenderAction";
import { MailSenderAction } from "./action/MailSenderAction";
import { MailSenderWorkerAction } from "./action/MailSenderWorkerAction";
import { MailReSenderActionInterface } from "./action/contract/MailReSenderActionInterface";
import { MailSenderActionInterface } from "./action/contract/MailSenderActionInterface";
import { MailSenderWorkerActionInterface } from "./action/contract/MailSenderWorkerActionInterface";
import { MailServiceInterface } from "./contract/MailServiceInterface";

/**
 * Class MailService
 */
export class MailService implements MailServiceInterface {
    protected senderAction: MailSenderActionInterface;
    protected senderWorkerAction: MailSenderWorkerActionInterface;
    protected reSenderAction: MailReSenderActionInterface;

    /**
     * Constructor
     */
    constructor() {
        this.senderAction = new MailSenderAction();
        this.senderWorkerAction = new MailSenderWorkerAction();
        this.reSenderAction = new MailReSenderAction();
    }
    
    /**
     * 
     * @param mailAction
     * @param date
     * @returns
     */
    async sendMail(
        mailAction: string, 
        date: string
    ): Promise<void> {
        return await this.senderAction.process(mailAction, date);
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