import { BaseModelInterface } from "../../../../lib/database/mysql/model/contract/BaseModelInterface";
import { UserModelInterface } from "../../../user/model/contract/UserModelInterface";
import { MailTemplateModelInterface } from "./MailTemplateModelInterface";

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

    /**
	 * RELATION
	 * =================================================================================================================
	 */
    getUser(): UserModelInterface;

    getTemplate(): MailTemplateModelInterface;
}
