import { MainDataSource } from "./mysql/MainDataSource";

/**
 * Class Database
 */
export class Database {
	async handle() {
		await this.openMainDataSource();
	}

	async closed() {
		await MainDataSource.destroy();
	}

	async openMainDataSource() {
		try {
			await MainDataSource.initialize();
			console.log(
				"\u2713",
				"Main Data Source has been initialized!"
			);
		} catch (e) {
			console.error(
				"\u274C",
				"Error during Main Data Source initialization",
				e
			);
		}
	}
}
