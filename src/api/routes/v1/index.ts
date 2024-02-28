import * as express from 'express';
import user from "./user";
import mail from "./mail";

const router = express.Router();

router.use('/user', user);
router.use('/mail', mail);

export default router;