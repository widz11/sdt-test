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
     * @returns
     */
    async getUsers(): Promise<UserModelInterface[]> {
        return await this.repository
			.createQueryBuilder('u')
			.getMany();
    }
}