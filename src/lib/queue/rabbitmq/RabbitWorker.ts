import { MailService } from "../../../api/mail/service/MailService";
import { LOGGER_LEVEL_ERROR, WinstonLogger } from "../../logger/winston/WinstonLogger";
import { AbstractRabbit } from "./abstract/AbstractRabbit";

export const QUEUE_MAIL = 'email';

/**
 * Class RabbitWorker
 */
export class RabbitWorker extends AbstractRabbit {
	/**
	 *
	 * @returns {Promise<void>}
	 */
	async handle() {
		try {
			await this.connect();
			await this.createChannel();
			await this.ch.prefetch(10);

			// Consumer
			await this.consume(QUEUE_MAIL)
		} catch (e) {
			console.log(e);
			const __self = this;
			setTimeout(() => {
				console.log("[RABBIT] reconnecting . . . .");
				return __self.handle();
			}, 1000);
		}
	}

	/**
	 *
	 * @returns {Promise<void>}
	 */
	async consume(route: any) {
		const __self = this;
		await __self.ch.assertQueue(route, { durable: true });
		__self.ch.consume(
			route,
			async (msg: any) => {
				await this.work(msg, function (ok: number) {
					try {
						if (ok) {
							__self.ch.ack(msg);
						} else {
							__self.ch.reject(msg, false);
						}
					} catch (e) {
						__self.closeConnection();
					}
				});
			},
			{
				noAck: false,
			}
		);
	}

	/**
	 *
	 * @param msg
	 * @param cb
	 * @returns {Promise<void>}
	 */
	async work(msg: any, cb: any) {
		const route = msg.fields.routingKey;
		const data = msg ? JSON.parse(msg.content) : null;
		try {
			// CONSUMER QUEUE
			switch (route) {
				case QUEUE_MAIL:
					await (new MailService).mailWorker(data);
					break;
			}
		} catch (e) {
			// LOG
			WinstonLogger.winstonLog(LOGGER_LEVEL_ERROR, e);
		} finally {
			cb(true);
		}
	}
}
