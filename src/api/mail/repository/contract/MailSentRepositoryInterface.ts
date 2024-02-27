import { BaseRepositoryInterface } from "../../../../lib/database/mysql/repository/contract/BaseRepositoryInterface";
import { MailSentModelInterface } from "../../model/contract/MailSentModelInterface";

/**
 * Interface MailSentRepositoryInterface
 */
export interface MailSentRepositoryInterface
	extends BaseRepositoryInterface
{
	/**
	 *
	 * @param id
     * @returns
	 */
	findByID(id: number): Promise<MailSentModelInterface | null>;

    /**
	 *
	 * @param userId
     * @param batch
     * @returns
	 */
	findByUserIDAndBatch(userId: number, batch: number): Promise<MailSentModelInterface | null>;

    /**
     * 
     * @param batch
     * @param status
     * @returns
     */
    getMailsByBatchAndStatus(batch: number, status: string): Promise<MailSentModelInterface[]>;
}
