/**
 * Module dependencies.
 */
import { config } from "dotenv";
import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { Routes } from "./api/routes";
import { Database } from "./lib/database/Database";
config();

/**
 * Class App
 */
class App {
	public app: Application;
	public routePrv: Routes = new Routes();
	private database: Promise<void>;

	/**
	 * Constructor App
	 */
	constructor() {
		this.app = express();
		this.config();
		this.routePrv.routes(this.app);
		this.database = new Database().handle();
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

export default new App().app;