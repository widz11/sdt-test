import { AbstractRabbit } from "./abstract/AbstractRabbit";
import * as console from "console";

/**
 * Class RabbitPublisher
 */
export class RabbitPublisher extends AbstractRabbit {
	/**
	 *
	 * @param exchange
	 * @param route
	 * @param content
	 * @returns {Promise<void>}
	 */
	async handlePub(exchange: any, route: any, content: any): Promise<void> {
		try {
			await this.connect();
			await this.createConfirmChannel();
			await this.publish(exchange, route, content);
			this.closeConnection();
		} catch (e) {
			// here make push offline queue
			console.log(e);
			const __self = this;
			setTimeout(() => {
				console.log("[RABBIT] reconnecting . . . .");
				return __self.handlePub(exchange, route, content);
			}, 1000);
		}
	}

	/**
	 *
	 * @param exchange
	 * @param route
	 * @param content
	 * @returns {Promise<void>}
	 */
	async publish(exchange: any, route: any, content: any): Promise<void> {
		try {
			this.pub = this.ch.publish(exchange, route, Buffer.from(content), {
				persistent: true,
			});
		} catch (e) {
			this.ch.connection.close();
			console.log(e);
		}
	}
}
