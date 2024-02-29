/**
 * Module dependencies.
 */
import { config } from "dotenv";
import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { Routes } from "./api/routes";
import { Database } from "./lib/database/Database";
import { RabbitWorker } from "./lib/queue/rabbitmq/RabbitWorker";
import { CronService } from "./cron/CronService";
config();

/**
 * Class App
 */
class App {
	public app: Application;
	public routePrv: Routes = new Routes();

	/**
	 * Constructor App
	 */
	constructor() {
		this.app = express();
		this.config();
		this.routePrv.routes(this.app);
	}

	async run(): Promise<void> {
		await this.database();
		await this.queue();
		await this.cron();
	}

	async database(): Promise<void> {
		await (new Database).handle();
	}

	async queue(): Promise<void> {
		await (new RabbitWorker).handle();
	}

	async cron(): Promise<void> {
		CronService.run();
	}

	private config(): void {
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS,PUT");
			res.header("Access-Control-Allow-Headers", "*");
			next();
		});
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));
	}
}

export default new App();