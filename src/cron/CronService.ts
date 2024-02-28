import cron from 'node-cron';
import { MailService } from "../api/mail/service/MailService";
import { MAIL_BIRTHDAY } from "../api/mail/service/action/abstract/AbstractMailAction";
import { Dateparser } from "../lib/date/Dateparser";

/**
 * Class CronService
 */
export class CronService {
    /**
     * 
     * @returns
     */
    static run(): void {
        // Cron send email
        cron.schedule('5 * * * * *', async () => {
        // cron.schedule('* 1 * * *', async () => { // Run every 1 hour
            console.log("Run cron mail birthday ");
            await (new MailService).sendMail(MAIL_BIRTHDAY, Dateparser.formatDate(new Date(), 'Y-m-d H:i:s'));
        });
    }
}