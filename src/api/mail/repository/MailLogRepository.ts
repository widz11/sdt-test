import { BaseRepository } from "../../../lib/database/mysql/repository/BaseRepository";
import { MailLogModel } from "../model/MailLogModel";
import { MailLogRepositoryInterface } from "./contract/MailLogRepositoryInterface";

/**
 * Class MailLogRepository
 */
export class MailLogRepository
	extends BaseRepository
	implements MailLogRepositoryInterface
{
	/**
	 * Constructor
	 */
	constructor() {
		super(MailLogModel);
	}
}