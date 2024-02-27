import { DataSource } from "typeorm";
import { join } from "path";
import { config } from "dotenv";
config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

export const MainDataSource = new DataSource({
	type: "mysql",
	host: DB_HOST,
	port: Number(DB_PORT),
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_DATABASE,
	synchronize: false,
	logging: false,
	entities: [
		join(
			__dirname,
			"..",
			"..",
			"..",
			"**/**/model/*.{ts,js}"
		),
	],
	migrations: [
		join(__dirname, "..", "..", "..", "migration/*.{js,ts}"),
	],
	poolSize: process.env.DB_CONNECTION_LIMIT ? parseInt(process.env.DB_CONNECTION_LIMIT) : 5,
	extra: {
		"connectionLimit": process.env.DB_CONNECTION_LIMIT ?? 5
	}
});
