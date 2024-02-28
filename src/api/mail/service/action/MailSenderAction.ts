import moment from "moment-timezone";
import { UserModelInterface } from "../../../user/model/contract/UserModelInterface";
import { MAIL_QUEUE, MAIL_TIME } from "./abstract/AbstractMailAction";
import { AbstractMailSenderAction } from "./abstract/AbstractMailSenderAction";

/**
 * Class MailSenderAction
 */
export class MailSenderAction 
    extends AbstractMailSenderAction
{
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
            // if (localHour == MAIL_TIME) {
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
                                message: this.mailTemplate.getMessage(), 
                            })
                        );
                        return trx.data;
                    }
                );
            // }
        }
    }
}