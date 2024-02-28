import { MailSenderAction } from "./action/MailSenderAction";
import { MailSenderActionInterface } from "./action/contract/MailSenderActionInterface";
import { MailServiceInterface } from "./contract/MailServiceInterface";

/**
 * Class MailService
 */
export class MailService implements MailServiceInterface {
    protected senderAction: MailSenderActionInterface;

    /**
     * Constructor
     */
    constructor() {
        this.senderAction = new MailSenderAction();
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
}