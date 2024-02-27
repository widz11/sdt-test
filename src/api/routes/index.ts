import { Request, Response, Application, NextFunction } from "express";
import v1 from "./v1";

/**
 * Class Routes
 */
export class Routes {
	/**
	 *
	 * @param app
	 */
	public routes(app: Application): void {
		// Enable CORS without external module
		app.use(function (req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS,PUT");
			res.header("Access-Control-Allow-Headers", "*");
			next();
		});

		/**
		 * API Health Check
		 * ===============================================================================================================
		 */
		// app.route("/").get((req: Request, res: Response) => {
		// 	res.status(200).send("Express + TypeScript Server");
		// });

		/**
		 * 🔥 API Documentations
		 * ===============================================================================================================
		 */
		app.route("/").get((req: Request, res: Response) => {
			res.sendFile(__dirname + "/docs/index.html");
		});
		app.route("/sdt-api-doc.json").get(
			(req: Request, res: Response) => {
				res.sendFile(__dirname + "/docs/sdt-api-doc.json");
			}
		);

		/**
		 * 🔥 API Version
		 * =============================================================================================================
		 * for version change, please add it in another folder, for example V1
		 */
		app.use("/v1", v1);

		// Optional fallthrough error handler
		app.use(function onError(
			err: any,
			req: Request,
			res: Response,
			next: NextFunction
		) {
			// The error id is attached to `res.sentry` to be returned
			// and optionally displayed to the user for support.
			const {
				display,
				report,
				code,
				status,
				data,
				error_message,
				error_code,
				created_at,
				service,
			} = err;
			if (typeof display !== "undefined" && display === true) {
				delete err.code;
				delete err.display;
				delete err.name;
				delete err.report;
				return res.status(code || 422).json({
					status,
					service: service || process.env.APP_NAME,
					code: code || 200,
					error_code: error_code || error_message,
					message: error_message || null,
					data,
					created_at,
				});
			}
			if (process.env.APP_DEBUG == "true") {
				console.error(err.stack);
				res.status(500);
				res.render("error", { error: err });
			}
			console.log(err);
			return res.send(err).status(err.code);
		});
	}
}
