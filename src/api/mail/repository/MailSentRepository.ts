import { BaseRepository } from "../../../lib/database/mysql/repository/BaseRepository";
import { MailSentModel } from "../model/MailSentModel";
import { MailSentModelInterface } from "../model/contract/MailSentModelInterface";
import { MailSentRepositoryInterface } from "./contract/MailSentRepositoryInterface";

/**
 * Class MailSentRepository
 */
export class MailSentRepository
	extends BaseRepository
	implements MailSentRepositoryInterface
{
	/**
	 * Constructor
	 */
	constructor() {
		super(MailSentModel);
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	async findByID(id: number): Promise<MailSentModelInterface | null> {
		return await this.repository.findOneBy({ id });
	}

    /**
     * 
     * @param userId
     * @param batch
     * @returns
     */
    async findByUserIDAndBatch(userId: number, batch: number): Promise<MailSentModelInterface | null> {
        return await this.repository
			.createQueryBuilder('ms')
            .where('user_id = :user_id', { user_id: userId })
            .andWhere('batch = :batch', { batch })
			.getOne();
    }

    /**
     * 
     * @param batch
     * @param status
     * @returns
     */
    async getMailsByBatchAndStatus(
        batch: number,
        status: string
    ): Promise<MailSentModelInterface[]> {
        return await this.repository
			.createQueryBuilder('ms')
            .innerJoinAndMapOne('ms.user', 'ms.user', 'u')
            .innerJoinAndMapOne('ms.template', 'ms.template', 'mt')
            .where('batch = :batch', { batch})
            .andWhere('status = :status', { status })
			.getMany();
    }
}