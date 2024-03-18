import { UserModelInterface } from "../../../user/model/contract/UserModelInterface";
import { AbstractMailSenderAction } from "./abstract/AbstractMailSenderAction";
import { Dateparser } from "../../../../lib/date/Dateparser";
import { MailSenderBirthdayActionInterface } from "./contract/MailSenderBirthdayActionInterface";

/**
 * Class MailSenderAction
 */
export class MailSenderAction 
    extends AbstractMailSenderAction
    implements MailSenderBirthdayActionInterface
{
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
}