import { BaseModelInterface } from "../../../../lib/database/mysql/model/contract/BaseModelInterface";

/**
 * Interface MailSentModelInterface
 */
export interface MailSentModelInterface extends BaseModelInterface {
	/**
	 * GETTER
	 * =================================================================================================================
	 */
    
    getUserID(): number;

	getMailTemplateID(): number;

    getAdminID(): number;

    getBatch(): number;

    getStatus(): string;

    getSendAt(): number;
}
