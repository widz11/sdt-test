import { RequestValidation } from "../../../../lib/validation/request/RequestValidation";

/**
 * Class UserFetcherRequest
 */
export class UserFetcherRequest extends RequestValidation {
    /**
     *
     * @param data
     */
    static async check(data: any): Promise<any> {
        return await UserFetcherRequest.validator(UserFetcherRequest.schema(), data)
    }

    /**
     * 
     * @returns
     */
    static schema(): object {
        return {};
    }
}
