/**
 * class DisplayableException
 */
export class DisplayableException extends Error {
	/**
	 *
	 * @private
	 */
	protected status: boolean;
	/**
	 *
	 * @private
	 */
	protected display: boolean;
	/**
	 *
	 * @private
	 */
	protected report: boolean;
	/**
	 *
	 * @private
	 */
	protected created_at: number;

	/**
	 *
	 * @param content
	 * @param name
	 */
	constructor(content: any | undefined, name: string) {
		super(content);
		this.status = false;
		this.name = name;
		this.display = true;
		this.report = true;
		this.created_at = Date.now();
		Object.setPrototypeOf(this, DisplayableException.prototype);
	}
}
