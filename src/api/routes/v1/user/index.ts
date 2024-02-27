import { NextFunction, Request, Response } from "express";
import * as express from "express";
import { UserController } from "../../../user/controller/UserController";
const router = express.Router();

router.get(
	"/",
	async function (req: Request, res: Response, next: NextFunction) {
		try {
            let payload = req.body;
            payload = req.query ? Object.assign(payload, req.query) : payload;
            payload = req.params ? Object.assign(payload, req.params) : payload;
			res.json(await new UserController().getUsers(payload)).status(200);
		} catch (e) {
			next(e);
		}
	}
);

router.post(
	"/",
	async function (req: Request, res: Response, next: NextFunction) {
		try {
            let payload = req.body;
            payload = req.query ? Object.assign(payload, req.query) : payload;
            payload = req.params ? Object.assign(payload, req.params) : payload;
			res.json(await new UserController().create(payload)).status(200);
		} catch (e) {
			next(e);
		}
	}
);

router.put(
	"/",
	async function (req: Request, res: Response, next: NextFunction) {
		try {
            let payload = req.body;
            payload = req.query ? Object.assign(payload, req.query) : payload;
            payload = req.params ? Object.assign(payload, req.params) : payload;
			res.json(await new UserController().update(payload)).status(200);
		} catch (e) {
			next(e);
		}
	}
);

router.delete(
	"/",
	async function (req: Request, res: Response, next: NextFunction) {
		try {
            let payload = req.body;
            payload = req.query ? Object.assign(payload, req.query) : payload;
            payload = req.params ? Object.assign(payload, req.params) : payload;
			res.json(await new UserController().delete(payload)).status(200);
		} catch (e) {
			next(e);
		}
	}
);

export default router;