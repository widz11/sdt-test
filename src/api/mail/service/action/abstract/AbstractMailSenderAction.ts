import moment from "moment-timezone";
import { Dateparser } from "../../../../../lib/date/Dateparser";
import { LOGGER_LEVEL_ERROR, WinstonLogger } from "../../../../../lib/logger/winston/WinstonLogger";
import { RabbitPublisher } from "../../../../../lib/queue/rabbitmq/RabbitPublisher";
import { UserModelInterface } from "../../../../user/model/contract/UserModelInterface";
import { UserService } from "../../../../user/service/UserService";
import { UserServiceInterface } from "../../../../user/service/contract/UserServiceInterface";
import { MAIL_BIRTHDAY, MailTemplateModelInterface } from "../../../model/contract/MailTemplateModelInterface";
import { AbstractMailAction, MAIL_QUEUE, MAIL_TIME } from "./AbstractMailAction";

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
     * @param date
     * @param users
     * @returns
     */
    async handle(
        date: string,
        users: UserModelInterface[]
    ): Promise<any> {
        const dateTime = moment(date);
        for (const user of users) {
            const localHour = dateTime.tz(user.getTimezone()).hour();
            if (localHour == this.getTimeLocal()) {
                const mailSent = await this.mailSentRepository
                    .findByUserIDAndBatch(
                        user.getID(),
                        this.batch
                    );
                if (mailSent) continue;
                await this.mailSentRepository.transaction(
                    async (entityManager: any) => {
                        // Store to mail sent
                        let trx = await this.mailSentRepository.createWithEntityManager({
                            user_id: user.getID(),
                            mail_template_id: this.mailTemplate.getID(),
                            batch: this.batch,
                            status: "processing",
                            send_at: 0,
                            admin_id: 0
                        }, entityManager);
                        entityManager = trx.entityManager;
                        // Sent to queue
                        await this.queue.handlePub("", MAIL_QUEUE, 
                            JSON.stringify({
                                admin_id: 0,
                                batch: this.batch,
                                mail_sent_id: trx.data.id,
                                user_id: user.getID(),
                                mail_template_id: this.mailTemplate.getID(),
                                email: user.getEmail(),
                                first_name: user.getFirstName(),
                                last_name: user.getLastName(),
                                dob: user.getDateOfBirth(),
                                template: this.mailTemplate.getName(),
                                message: this.mailTemplate.generateMessage(user.fullName()), 
                            })
                        );
                        return trx.data;
                    }
                );
            }
        }
    }

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
        return await this.userService.getUsers({});
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

    /**
     * 
     * @returns
     */
    getTimeLocal(): number {
        return MAIL_TIME;
    }
}