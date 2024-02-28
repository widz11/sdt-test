import { ClientResponse } from "../../../../lib/client/ClientResponse";
import { AbstractMailSenderWorkerAction, MailPayload } from "./abstract/AbstractMailSenderWorkerAction";
import { MailSenderWorkerActionInterface } from "./contract/MailSenderWorkerActionInterface";

/**
 * Class MailSenderWorkerAction
 */
export class MailSenderWorkerAction 
    extends AbstractMailSenderWorkerAction
    implements MailSenderWorkerActionInterface
{
    /**
     * 
     * @param payload
     */
    async handle(
        payload: MailPayload
    ): Promise<void> {
        if (this.mailSent.getStatus() == 'success') return;
        let response = new ClientResponse({});
        try {
            // Send mail
            response = await this.sendMail(payload);
            await this.mailSentRepository.transaction(
                async (entityManager: any) => {
                    // Update status
                    const mailSent = await this.mailSentRepository.updateWithEntityManager(
                        this.mailSent.getID(),
                        {
                            status: response.isSuccess() ? "success" : "failed",
                            send_at: Date.now(),
                        },
                        entityManager
                    );
                    entityManager = mailSent.entityManager;

                    if (!response.isSuccess()) {
                        // Create mail log
                        const mailLog = await this.mailLogRepository.createWithEntityManager({
                            mail_sent_id: this.mailSent.getID(),
                            exception: response.getMessage()
                        }, entityManager);
                        entityManager = mailLog.entityManager;
                    }
                }
            );
        } catch(e: any) {
            // Check error message from response if exist
            if (response.getMessage()) {
                e.message = response.getMessage();
            }
            throw e;
        }
    }
}