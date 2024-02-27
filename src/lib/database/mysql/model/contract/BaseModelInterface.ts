/**
 * Interface BaseModelInterface
 */
export interface BaseModelInterface {
	// GETTER
	/**
	 * @returns
	 */
	getID(): number;

	/**
	 *
	 * @returns
	 */
	getCreatedAt(): string;

	/**
	 *
	 * @returns
	 */
	getUpdatedAt(): string;

	// MUTATOR
	/**
	 *
	 * @returns
	 */
	createdAt(): Date;

	/**
	 *
	 * @returns
	 */
	updatedAt(): Date;
}
