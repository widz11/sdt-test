import { DisplayableException } from "../../../lib/exception/DisplayableException";

/**
 * Class UserException
 */
export class UserException extends DisplayableException {
	/**
	 *
	 * @private
	 */
	public error_message: string;

	/**
	 *
	 * @private
	 */
	public code: number;
	/**
	 *
	 * @private
	 */
	public data: any;
	/**
	 *
	 * @private
	 */
	private error_code: any;

	/**
	 *
	 * @param data
	 * @param message
	 * @param error_code
	 * @param http_code
	 */
	constructor(
		data: any,
		message: string = "User exception",
		error_code: string = "422",
		http_code: number = 422
	) {
		super(message, "user.exception");
		this.error_message = message;
		this.error_code = error_code;
		this.code = http_code;
		this.data = data;
		Object.setPrototypeOf(this, UserException.prototype);
	}
}
