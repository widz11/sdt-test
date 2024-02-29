import { BaseModelInterface } from "../../../../lib/database/mysql/model/contract/BaseModelInterface";

/**
 * Interface UserModelInterface
 */
export interface UserModelInterface extends BaseModelInterface {
	/**
	 * GETTER
	 * =================================================================================================================
	 */
    
    getEmail(): string;

    getFirstName(): string;

	getLastName(): string;

    getDateOfBirth(): string;

    getTimezone(): string;

	/**
	 * MUTATOR
	 * =================================================================================================================
	 */
	fullName(): string;
}
