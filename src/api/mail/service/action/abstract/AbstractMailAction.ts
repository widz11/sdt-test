import { MailLogRepository } from "../../../repository/MailLogRepository";
import { MailSentRepository } from "../../../repository/MailSentRepository";
import { MailTemplateRepository } from "../../../repository/MailTemplateRepository";
import { MailLogRepositoryInterface } from "../../../repository/contract/MailLogRepositoryInterface";
import { MailSentRepositoryInterface } from "../../../repository/contract/MailSentRepositoryInterface";
import { MailTemplateRepositoryInterface } from "../../../repository/contract/MailTemplateRepositoryInterface";

export const MAIL_QUEUE = "email";
export const MAIL_TIME = 9;

/**
 * Abstract Class AbstractMailAction
 */
export abstract class AbstractMailAction {
    protected mailTemplateRepository: MailTemplateRepositoryInterface;
    protected mailLogRepository: MailLogRepositoryInterface;
    protected mailSentRepository: MailSentRepositoryInterface;
    
    /**
     * Constructor
     */
    constructor() {
        this.mailTemplateRepository = new MailTemplateRepository();
        this.mailLogRepository = new MailLogRepository();
        this.mailSentRepository = new MailSentRepository();
    }
}