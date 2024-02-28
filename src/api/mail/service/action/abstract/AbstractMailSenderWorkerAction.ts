import { ClientResponse } from "../../../../../lib/client/ClientResponse";
import { ClientService } from "../../../../../lib/client/ClientService";
import { LOGGER_LEVEL_ERROR, WinstonLogger } from "../../../../../lib/logger/winston/WinstonLogger";
import { MailSentModelInterface } from "../../../model/contract/MailSentModelInterface";
import { AbstractMailAction } from "./AbstractMailAction";

/**
 * Interface MailPayload
 */
export interface MailPayload {
    batch: number;
    mail_sent_id: number;
    user_id: number;
    mail_template_id: number;
    admin_id: number;
    email: string;
    first_name: string;
    last_name: string;
    dob: string;
    template: string;
    message: string;
}

/**
 * Abstract Class AbstractMailSenderWorkerAction
 */
export abstract class AbstractMailSenderWorkerAction extends AbstractMailAction {
    /**
     * @protected
     */
    protected client: ClientService;
    protected mailUrl: string = "https://email-service.digitalenvision.com.au/send-email";
    protected mailUrlMethod: string = "POST";
    protected mailSent!: MailSentModelInterface;

    /**
     * Constructor
     */
    constructor() {
        super();
        this.client = new ClientService();
    }

    /**
     * 
     * @param payload
     * @returns
     */
    async process(payload: MailPayload): Promise<void> {
        try {
            /**
             * Find mail sent
             */
            this.mailSent = await this.findMailSent(payload);
            /**
             * Handle mail sent
             */
            await this.handle(payload);
        } catch(e) {
            await this.handleError(payload, e);
        }
    }

    /**
     * 
     * @param payload
     * @returns
     */
    abstract handle(payload: MailPayload): Promise<void>;

    /**
     * 
     * @param payload
     * @param e
     */
    async handleError(payload: MailPayload, error: any): Promise<void> {
        try {
            let { message } = error ?? {};
            await this.mailSentRepository.transaction(
                async (entityManager: any) => {
                    if (this.mailSent) {
                        // Update status failed
                        const mailSent = await this.mailSentRepository.updateWithEntityManager(
                            this.mailSent.getID(),
                            {
                                status: 'failed',
                                send_at: 0
                            },
                            entityManager
                        );
                        entityManager = mailSent.entityManager;
                    }
                    // Create mail log
                    const mailLog = await this.mailLogRepository.createWithEntityManager({
                        mail_sent_id: this.mailSent.getID(),
                        exception: message
                    }, entityManager);
                    entityManager = mailLog.entityManager;
                }
            );
        } catch(e) {
            WinstonLogger.winstonLog(LOGGER_LEVEL_ERROR, e)
        }
    }

    /**
     * 
     * @param payload
     * @returns
     */
    async sendMail(payload: MailPayload): Promise<ClientResponse> {
        const response = await this.client.process({
            email: payload.email,
            message: payload.message
        }, this.mailUrl, this.mailUrlMethod, {});
        const clientResponse = new ClientResponse(response);
        return clientResponse;
    }

    /**
     * 
     * @param payload
     * @returns
     */
    async findMailSent(payload: MailPayload): Promise<MailSentModelInterface> {
        const mailSent = await this.mailSentRepository
            .findByUserIDAndBatch(payload.user_id, payload.batch);
        if (!mailSent) {
            throw new Error(`Mail sent not found: ${payload.mail_sent_id}`);
        }
        return mailSent;
    }
}