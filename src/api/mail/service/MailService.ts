import { MailSenderAction } from "./action/MailSenderAction";
import { MailSenderWorkerAction } from "./action/MailSenderWorkerAction";
import { MailSenderActionInterface } from "./action/contract/MailSenderActionInterface";
import { MailSenderWorkerActionInterface } from "./action/contract/MailSenderWorkerActionInterface";
import { MailServiceInterface } from "./contract/MailServiceInterface";

/**
 * Class MailService
 */
export class MailService implements MailServiceInterface {
    protected senderAction: MailSenderActionInterface;
    protected senderWorkerAction: MailSenderWorkerActionInterface;

    /**
     * Constructor
     */
    constructor() {
        this.senderAction = new MailSenderAction();
        this.senderWorkerAction = new MailSenderWorkerAction();
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
}