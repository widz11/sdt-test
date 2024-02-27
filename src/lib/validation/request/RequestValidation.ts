import { Comparison } from "./Comparison";
import { ValidateRequestException } from "./ValidateRequestException";

/**
 * Class RequestValidation
 */
export class RequestValidation {
	static string = "string";
	static numeric = "numeric";
	static required = "required";
	static boolean = "boolean";
	static email = "email";

	/**
	 *
	 * @param schema
	 * @param data
	 */
	static validator(schema: any, data: any) {
		/**
		 *
		 * @type {string[]}
		 */
		const rules = Object.getOwnPropertyNames(schema);
		/**
		 *
		 * @type {number}
		 */
		const len = rules.length;
		/**
		 *
		 * @type {Array}
		 */
		const errors = [];
		for (let i = 0; i < len; i++) {
			try {
				RequestValidation.execute(data[rules[i]], schema[rules[i]]);
			} catch (error: any) {
				errors.push({
					field: rules[i],
					value: data[rules[i]],
					message: error.message,
				});
			}
		}
		if (errors.length > 0) {
			throw new ValidateRequestException(errors);
		}
		return data;
	}

	/**
	 *
	 * @param value
	 * @param rules
	 */
	static execute(value: any, rules: any) {
		if (!Array.isArray(rules)) {
			throw Error("invalid schema");
		}
		rules.forEach((e) => {
			const type = this.getValidationType(e);
			switch (type) {
				case RequestValidation.numeric:
					if (value) {
						Comparison.isNumeric(value);
					}
					break;
				case RequestValidation.string:
					if (value) {
						Comparison.isString(value);
					}
					break;
				case RequestValidation.boolean:
					if (value) {
						Comparison.isBoolean(value);
					}
					break;
				case RequestValidation.email:
					if (value) {
						Comparison.email(value);
					}
					break;
			}
		});
	}

	/**
	 *
	 * @param input
	 */
	static getValidationType(input: string): string {
		const result = input.split(":").map(function (item) {
			return item.trim().toLocaleLowerCase();
		});
		return result.length > 0 ? result[0] : input.trim().toLocaleLowerCase();
	}
}
