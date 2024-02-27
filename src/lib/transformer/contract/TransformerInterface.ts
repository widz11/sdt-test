export interface TransformerInterface {
	/**
	 * @return TransformerResponseInterface
	 */
	json(): Promise<{
		data: any;
		service: string;
		created_at: number;
		message: string;
		status: boolean;
	}>;
}
