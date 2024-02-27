import { BaseRepositoryInterface } from "../../../../lib/database/mysql/repository/contract/BaseRepositoryInterface";
import { MailTemplateModelInterface } from "../../model/contract/MailTemplateModelInterface";

/**
 * Interface MailTemplateRepositoryInterface
 */
export interface MailTemplateRepositoryInterface
	extends BaseRepositoryInterface
{
	/**
	 *
	 * @param id
     * @returns
	 */
	findByID(id: number): Promise<MailTemplateModelInterface | null>;

    /**
	 *
	 * @param name
     * @returns
	 */
	findByName(name: string): Promise<MailTemplateModelInterface | null>;
}
