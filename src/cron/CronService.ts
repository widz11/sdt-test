import cron from 'node-cron';
import { MailService } from "../api/mail/service/MailService";
import { Dateparser } from "../lib/date/Dateparser";
import { MAIL_BIRTHDAY } from "../api/mail/model/contract/MailTemplateModelInterface";

/**
 * Class CronService
 */
export class CronService {
    /**
     * 
     * @returns
     */
    static run(): void {
        // Cron send email birthday
        cron.schedule('* 1 * * *', async () => { // Run every 1 hour
            console.log("Run cron mail birthday ");
            await (new MailService).sendMailBirthday(MAIL_BIRTHDAY, Dateparser.formatDate(new Date(), 'Y-m-d H:i:s'));
        });
        // Cron send email anniv
        cron.schedule('* * 18 3 *', async () => { // Run every date 18 Mar
            console.log("Run cron mail anniv ");
            await (new MailService).sendMailBirthday(MAIL_BIRTHDAY, Dateparser.formatDate(new Date(), 'Y-m-d H:i:s'));
        });
    }
}