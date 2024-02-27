import { Transformer } from "../../../../lib/transformer/Transformer";

/**
 * Class UserTransformer
 */
export class UserTransformer extends Transformer {
	/**
	 * @return
	 */
	async setData(): Promise<any> {
		return await this.setFormat(this.data);
	}

	/**
	 *
	 * @param data
	 */
	async setFormat(data: any): Promise<any> {
		return data;
	}
}
