import amqp from "amqplib";

/**
 * Class AbstractRabbit
 */
export class AbstractRabbit {
	public amqp: any;
	public conn: any;
	public ch: any;
	public socket: any;
	public pub: any;
	public que: any;

	/**
	 * Constructor AbstractRabbit
	 */
	constructor() {
		this.amqp = amqp;
		this.conn = null;
		this.ch = null;
		this.pub = null;
		this.que = null;
		this.socket = null;
	}

	/**
	 *
	 * @returns {Promise<null>}
	 */
	async connect(): Promise<void> {
		try {
			this.conn = await this.amqp.connect(
				`amqp://${process.env.RABBIT_MQ_USERNAME}:${process.env.RABBIT_MQ_PASSWORD}@${process.env.RABBIT_MQ_HOST}?heartbeat=${process.env.RABBIT_MQ_HEAR_BEAT}`
			);
			console.info("rabbit is online . . . ");
		} catch (e) {
			const __self = this;
			setTimeout(() => {
				console.log("rabbit reconnecting . . . .");
				return __self.connect();
			}, 1000);

			console.log(e);
		}
	}

	/**
	 * @returns {Promise<void>}
	 */
	async createConfirmChannel(): Promise<void> {
		try {
			this.ch = await this.conn.createConfirmChannel();
		} catch (e) {
			this.closeConnection();
			console.log(e);
		}
	}

    /**
	 * @returns {Promise<void>}
     */
	async createChannel(): Promise<void> {
		try {
			this.ch = await this.conn.createChannel();
		} catch (e) {
			this.closeConnection();
			console.log(e);
		}
	}

	/**
	 *
	 * @returns {boolean}
	 */
	closeConnection(): boolean {
		const connection = this.conn;
		setTimeout(() => {
			return connection.close();
		}, 1000);

		return true;
	}
}
