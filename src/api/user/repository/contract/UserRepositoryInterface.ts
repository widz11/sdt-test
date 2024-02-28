import { BaseRepositoryInterface } from "../../../../lib/database/mysql/repository/contract/BaseRepositoryInterface";
import { UserModelInterface } from "../../model/contract/UserModelInterface";

/**
 * Interface UserRepositoryInterface
 */
export interface UserRepositoryInterface
	extends BaseRepositoryInterface
{
	/**
	 *
	 * @param id
     * @returns
	 */
	findByID(id: number): Promise<UserModelInterface | null>;

    /**
	 *
	 * @param email
     * @returns
	 */
	findByEmail(email: string): Promise<UserModelInterface | null>;

	/**
	 *
	 * @params input
	 * @returns
	 */
	getUsers(input: any): Promise<UserModelInterface[]>;
}
