import { BaseModelInterface } from "../../../../lib/database/mysql/model/contract/BaseModelInterface";

/**
 * Interface MailTemplateInterface
 */
export interface MailTemplateInterface extends BaseModelInterface {
	/**
	 * GETTER
	 * =================================================================================================================
	 */
    
    getName(): string;

	getMessage(): string;
}
