import { RequestValidation } from "../../../../lib/validation/request/RequestValidation";

/**
 * Class MailReSenderRequest
 */
export class MailReSenderRequest extends RequestValidation {
    /**
     *
     * @param data
     */
    static async check(data: any): Promise<any> {
        return await MailReSenderRequest.validator(MailReSenderRequest.schema(), data)
    }

    /**
     * 
     * @returns
     */
    static schema(): object {
        return {
            batch: [
                MailReSenderRequest.required,
                MailReSenderRequest.string
            ],
            admin_id: [
                MailReSenderRequest.numeric,
            ],
        };
    }
}
