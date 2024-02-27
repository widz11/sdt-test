import { BaseModelInterface } from "./contract/BaseModelInterface";

/**
 * Class BaseModel
 */
export class BaseModel
    implements BaseModelInterface
{
	/**
	 * @protected
	 */
    protected id: number | undefined;
	/**
	 * @protected
	 */
	protected created_at: string | undefined;
	/**
	 * @protected
	 */
	protected updated_at: string | undefined;

	// GETTER
	/**
	 * @returns
	 */
	getID(): number {
		return typeof this.id == "string" && this.id ? parseInt(this.id) : 0;
	}

	/**
	 *
	 * @returns
	 */
	getCreatedAt(): string {
		return this.created_at as string;
	}

	/**
	 *
	 * @returns
	 */
	getUpdatedAt(): string {
		return this.updated_at as string;
	}

	// MUTATOR
	/**
	 *
	 * @param format
	 * @returns
	 */
	createdAt(): Date {
		return new Date(this.getCreatedAt());
	}

	/**
	 *
	 * @param format
	 * @returns
	 */
	updatedAt(): Date {
		return new Date(this.getCreatedAt());
	}
}