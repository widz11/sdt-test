import { TransformerInterface } from "./contract/TransformerInterface";
import { TransformerResponseInterface } from "./contract/TransformerResponseInterface";

/**
 * Class TransformerV2
 */
export class Transformer implements TransformerInterface {
	/**
	 *
	 * @private
	 */
	protected data: any;

	/**
	 *
	 * @private
	 */
	protected service: string;

	/**
	 *
	 * @private
	 */
	protected message: string;

	/**
	 * Constructor Transformer
	 *
	 * @param data
	 * @param service
	 * @param message
	 */
	constructor(
		data: any,
		service = "sdt.service",
		message = "Successfully"
	) {
		this.data = data;
		this.service = service;
		this.message = message;
	}

	/**
	 *
	 * @returns
	 */
	async setData(): Promise<any> {
		return this.data;
	}

	/**
	 *
	 * @returns
	 */
	async json(): Promise<TransformerResponseInterface> {
		return {
			status: true,
			service: this.service,
			message: this.message,
			data: await this.setData(),
			created_at: Date.now(),
		};
	}

	/**
	 *
	 * @returns
	 */
	async jsonDataEncrypted(): Promise<TransformerResponseInterface> {
		return {
			status: true,
			service: this.service,
			message: this.message,
			data: await this.setData(),
			created_at: Date.now(),
		};
	}

	/**
	 *
	 * @param list
	 * @param pagination
	 * @returns
	 */
	async setDataPaginated(
		list: [],
		pagination: []
	): Promise<{ data: any; pagination: any }> {
		const data = [];
		if (list && list.length >= 0) {
			for (const listItem of list) {
				data.push(await this.setFormat(listItem));
			}
		}
		return {
			data,
			pagination,
		};
	}

	/**
	 *
	 * @param data
	 * @returns
	 */
	async setFormat(data: any): Promise<any> {
		return data;
	}
}
