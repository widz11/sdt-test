import { Dateparser } from "../../../../../lib/date/Dateparser";
import { LOGGER_LEVEL_ERROR, WinstonLogger } from "../../../../../lib/logger/winston/WinstonLogger";
import { RabbitPublisher } from "../../../../../lib/queue/rabbitmq/RabbitPublisher";
import { UserModelInterface } from "../../../../user/model/contract/UserModelInterface";
import { UserService } from "../../../../user/service/UserService";
import { UserServiceInterface } from "../../../../user/service/contract/UserServiceInterface";
import { MailTemplateModelInterface } from "../../../model/contract/MailTemplateModelInterface";
import { AbstractMailAction, MAIL_BIRTHDAY } from "./AbstractMailAction";

/**
 * Abstract Class AbstractMailSenderAction
 */
export abstract class AbstractMailSenderAction 
    extends AbstractMailAction
{
    /**
     * @protected
     */
    protected userService: UserServiceInterface;
    protected mailTemplate!: MailTemplateModelInterface;
    protected queue: RabbitPublisher;
    protected batch!: number;
    protected date!: string;
    
    /**
     * Constructor
     */
    constructor() {
        super();
        this.userService = new UserService();
        this.queue = new RabbitPublisher();
    }

    /**
     * @params input
     * @returns
     */
    async process(
        mailAction: string = MAIL_BIRTHDAY,
        date: string,
    ): Promise<void> {
        try {
            /**
             * Generate batch
             */
            this.batch = this.generateBatch(date);
            /**
             * Find template
             */
            this.mailTemplate = await this.findMailTemplate(mailAction);
            /**
             * Fetch users
             */
            const users = await this.getUsers(date);
            /**
             * Handle mail sent
             */
            await this.handle(date, users);
        } catch(e) {
            await this.handleError(e);
        }
    }

    /**
     * 
     * @param users
     * @returns
     */
    abstract handle(date: string, users: UserModelInterface[]): Promise<any>;

    /**
     * 
     * @param e
     */
    async handleError(e: any): Promise<void> {
        WinstonLogger.winstonLog(LOGGER_LEVEL_ERROR, e)
    }

    /**
     * 
     * @param mailAction
     * @returns
     */
    async findMailTemplate(mailAction: string): Promise<MailTemplateModelInterface> {
        const template = await this.mailTemplateRepository.findByName(mailAction);
        if (!template) {
            throw new Error(`Mail template not found: ${mailAction}`);
        }
        return template;
    }

    /**
     * 
     * @param date
     * @returns
     */
    async getUsers(date: string): Promise<UserModelInterface[]> {
        const dob = new Date(date);
        let startDate = Dateparser.formatDate(Dateparser.subHours(dob, 12), 'Y-m-d');
        let endDate = Dateparser.formatDate(Dateparser.addHours(dob, 12), 'Y-m-d');
        return await this.userService.getUsers({
            start_date: startDate,
            end_date: endDate
        });
    }

    /**
     * 
     * @param date
     * @returns
     */
    generateBatch(date: string): number {
        date = Dateparser.formatDate(new Date(date), 'Y-m-d');
        return new Date(date).getTime();
    } 
}