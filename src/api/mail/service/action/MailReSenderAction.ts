import { MAIL_QUEUE } from "./abstract/AbstractMailAction";
import { AbstractMailReSenderAction } from "./abstract/AbstractMailReSenderAction";
import { MailReSenderActionInterface } from "./contract/MailReSenderActionInterface";

/**
 * Class MailReSenderAction
 */
export class MailReSenderAction 
    extends AbstractMailReSenderAction
    implements MailReSenderActionInterface
{
    /**
     * 
     * @param request
     * @returns
     */
    async handle(request: any): Promise<any> {
        const { admin_id } = request ?? {};
        const mailSentList = await this.getMailSentByBatch(request);
        for (const mailSent of mailSentList) {
            await this.mailSentRepository.transaction(
                async (entityManager: any) => {
                    // Update status into processing
                    const trx = await this.mailSentRepository.updateWithEntityManager(
                        mailSent.getID(),
                        { status: "processing" },
                        entityManager
                    );
                    entityManager = trx.entityManager;

                    // Sent to queue
                    await this.queue.handlePub("", MAIL_QUEUE, 
                        JSON.stringify({
                            admin_id: admin_id ? admin_id : 0,
                            batch: mailSent.getBatch(),
                            mail_sent_id: mailSent.getID(),
                            user_id: mailSent.getUserID(),
                            mail_template_id: mailSent.getMailTemplateID(),
                            email: mailSent.getUser().getEmail(),
                            first_name: mailSent.getUser().getFirstName(),
                            last_name: mailSent.getUser().getLastName(),
                            dob: mailSent.getUser().getDateOfBirth(),
                            template: mailSent.getTemplate().getName(),
                            message: mailSent.getTemplate().getMessage(),
                        })
                    );
                }
            );
        }
        return {
            total_data: mailSentList.length
        }
    }

    /**
     * 
     * @param request
     * @returns
     */
    async validate(request: any): Promise<void> {}
}