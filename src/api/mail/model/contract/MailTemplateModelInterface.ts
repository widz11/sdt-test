import { BaseModelInterface } from "../../../../lib/database/mysql/model/contract/BaseModelInterface";

export const MAIL_BIRTHDAY = "mail-birthday";
export const MAIL_ANNIVERSARY = "mail-anniversary";

/**
 * Interface MailTemplateModelInterface
 */
export interface MailTemplateModelInterface extends BaseModelInterface {
	/**
	 * GETTER
	 * =================================================================================================================
	 */
    
    getName(): string;

	getMessage(): string;

	/**
	 * MUTATOR
	 * =================================================================================================================
	 */
	generateMessage(name: string): string;
}
