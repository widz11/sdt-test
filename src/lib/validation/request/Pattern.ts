/**
 * class Pattern
 */
export class Pattern {
	/**
	 *
	 * @returns {RegExp}
	 */
	static email() {
		return RegExp(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
	}

	/**
	 *
	 * @returns {RegExp}
	 */
	static numeric() {
		return RegExp(/^[0-9]+$/);
	}
	
	/**
	 *
	 * @returns {RegExp}
	 */
	static date() {
		return RegExp("[0-9]{4}\\-[0-9]+\\-[0-9]{2}");
	}

	/**
	 *
	 * @returns {RegExp}
	 */
	static text() {
		return RegExp(/^[^"\\]+$/);
	}
}
