import { DisplayableException } from "../../../../../lib/exception/DisplayableException";
import { RabbitPublisher } from "../../../../../lib/queue/rabbitmq/RabbitPublisher";
import { MailException } from "../../../exception/MailException";
import { MailSentModelInterface } from "../../../model/contract/MailSentModelInterface";
import { AbstractMailAction } from "./AbstractMailAction";

/**
 * Abstract Class AbstractMailReSenderAction
 */
export abstract class AbstractMailReSenderAction extends AbstractMailAction {
    /**
     * @protected
     */
    protected queue: RabbitPublisher;
    
    /**
     * Constructor
     */
    constructor() {
        super();
        this.queue = new RabbitPublisher();
    }
    
    /**
     * 
     * @param request
     * @returns
     */
    async process(request: any): Promise<any> {
        await this.validate(request);
        try {
            return this.handle(request);
        } catch(e) {
            return await this.handleError(e);
        }
    }

    /**
     * 
     * @param request
     * @returns
     */
    abstract validate(request: any): Promise<void>;

    /**
     * 
     * @param request
     * @returns
     */
    abstract handle(request: any): Promise<boolean>;

    /**
     * 
     * @param e
     */
    async handleError(e: any): Promise<void> {
        if (e instanceof DisplayableException) {
			throw e;
		}
		throw new MailException({}, "Failed process");
    }

    /**
     * 
     * @param request
     * @returns
     */
    async getMailSentByBatch(request: any): Promise<MailSentModelInterface[]> {
        const { batch } = request ?? {};
        return await this.mailSentRepository
            .getMailsByBatchAndStatus(batch, "failed");
    }
}