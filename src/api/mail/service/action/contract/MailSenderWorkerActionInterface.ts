import { MailPayload } from "../abstract/AbstractMailSenderWorkerAction";

/**
 * Interface MailSenderWorkerActionInterface
 */
export interface MailSenderWorkerActionInterface {
    /**
     * 
     * @param payload
     * @returns
     */
    process(payload: MailPayload): Promise<void>;   
}