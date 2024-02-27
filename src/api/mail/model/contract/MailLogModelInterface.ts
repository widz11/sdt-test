import { BaseModelInterface } from "../../../../lib/database/mysql/model/contract/BaseModelInterface";

/**
 * Interface MailLogModelInterface
 */
export interface MailLogModelInterface extends BaseModelInterface {
	/**
	 * GETTER
	 * =================================================================================================================
	 */
    
    getMailSentID(): number;

    getException(): string;
}
