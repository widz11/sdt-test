import { BaseModelInterface } from "../../../../lib/database/mysql/model/contract/BaseModelInterface";

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
