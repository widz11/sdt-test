import { BaseRepository } from "../../../lib/database/mysql/repository/BaseRepository";
import { MailTemplateModel } from "../model/MailTemplateModel";
import { MailTemplateModelInterface } from "../model/contract/MailTemplateModelInterface";
import { MailTemplateRepositoryInterface } from "./contract/MailTemplateRepositoryInterface";

/**
 * Class MailTemplateRepository
 */
export class MailTemplateRepository
	extends BaseRepository
	implements MailTemplateRepositoryInterface
{
	/**
	 * Constructor
	 */
	constructor() {
		super(MailTemplateModel);
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	async findByID(id: number): Promise<MailTemplateModelInterface | null> {
		return await this.repository.findOneBy({ id });
	}

    /**
     * 
     * @param name
     * @returns
     */
    async findByName(name: string): Promise<MailTemplateModelInterface | null> {
        return await this.repository
			.createQueryBuilder('mt')
			.where("LOWER(mt.name) = LOWER(:name)", { name })
			.getOne();
    }
}