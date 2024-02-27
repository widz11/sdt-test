import { Pattern } from "./Pattern";

/**
 *
 * @type {string[]}
 */
export const FILE_ALLOWED: string[] = [
	"image/png",
	"image/jpeg",
	"image/webp",
	"image/bmp",
	"image/jpg",
	"image/gif",
];

/**
 * @type {number}
 */
export const MAX_FILE_SIZE: number = 3150000;

/**
 * Comparison
 */
export class Comparison {
	/**
	 *
	 * @param value
	 * @returns {*}
	 */
	static isNumeric(value: any): any {
		if (!Pattern.numeric().test(value)) {
			throw Error(`only ascii number (0-9) are allowed`);
		}
	}

	/**
	 *
	 * @param value
	 * @returns {*}
	 */
	static isBoolean(value: any): any {
		if (typeof value !== "boolean") {
			throw Error(`type data must boolean (true/false)`);
		}
	}

	/**
	 *
	 * @param value
	 * @returns {*}
	 */
	static isString(value: any): any {
		if (typeof value !== "string") {
			throw Error(`type data must string`);
		}
	}

	/**
	 * 
	 * @param value
	 * @returns
	 */
	static email(value: string) {
		const mailFormat =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!value.match(mailFormat)) {
			throw new Error("type data must email");
		}
		return true;
	}
}
