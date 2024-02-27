import { RequestValidation } from "../../../../../lib/validation/request/RequestValidation";

/**
 * Class UserDeleteRequest
 */
export class UserDeleteRequest extends RequestValidation {
    /**
     *
     * @param data
     */
    static async check(data: any): Promise<any> {
        return await UserDeleteRequest.validator(UserDeleteRequest.schema(), data)
    }

    /**
     * 
     * @returns
     */
    static schema(): object {
        return {
            id: [
                UserDeleteRequest.required,
                UserDeleteRequest.numeric
            ]
        };
    }
}
