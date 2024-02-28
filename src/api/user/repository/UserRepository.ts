import { BaseRepository } from "../../../lib/database/mysql/repository/BaseRepository";
import { UserModel } from "../model/UserModel";
import { UserModelInterface } from "../model/contract/UserModelInterface";
import { UserRepositoryInterface } from "./contract/UserRepositoryInterface";

/**
 * Class UserRepository
 */
export class UserRepository
	extends BaseRepository
	implements UserRepositoryInterface
{
	/**
	 * Constructor
	 */
	constructor() {
		super(UserModel);
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	async findByID(id: number): Promise<UserModelInterface | null> {
		return await this.repository.findOneBy({ id });
	}

    /**
     * 
     * @param email
     * @returns
     */
    async findByEmail(email: string): Promise<UserModelInterface | null> {
        return await this.repository
			.createQueryBuilder('u')
			.where("LOWER(u.email) = LOWER(:email)", { email })
			.getOne();
    }

    /**
     * 
	 * @params input
     * @returns
     */
    async getUsers(input: any): Promise<UserModelInterface[]> {
		// Init
		const { start_date, end_date } = input ?? {};
		// Query
		let query = this.repository
			.createQueryBuilder('u');
		// Filter by date range
		if (start_date && end_date) {
			query = query.where('MONTH(u.dob) >= MONTH(:start_date)', { start_date })
				.andWhere('MONTH(u.dob) <= MONTH(:end_date)', { end_date })
				.andWhere('DAY(u.dob) >= DAY(:start_date)', { start_date })
				.andWhere('DAY(u.dob) <= DAY(:end_date)', { end_date });
		}
        return await query.getMany();
    }
}