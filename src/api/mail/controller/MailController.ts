import { MailReSenderRequest } from "../middleware/request/MailReSenderRequest";
import { MailService } from "../service/MailService";
import { MailServiceInterface } from "../service/contract/MailServiceInterface";
import { MailTransformer } from "../transformer/MailTransformer";

/**
 * Class MailController
 */
export class MailController {
    protected service: MailServiceInterface;

    /**
     * Constructor
     */
    constructor() {
        this.service = new MailService();
    }

    /**
	 *
	 * @param request
     * @returns
	 */
	async reSendMail(
		request: any
	): Promise<any> {
		return await new MailTransformer(
			await this.service.reSendMail(
				await MailReSenderRequest.check(request)
			)
		).json();
	}
}