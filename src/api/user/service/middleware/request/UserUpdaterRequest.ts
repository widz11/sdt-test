import { RequestValidation } from "../../../../../lib/validation/request/RequestValidation";

/**
 * Class UserUpdaterRequest
 */
export class UserUpdaterRequest extends RequestValidation {
    /**
     *
     * @param data
     */
    static async check(data: any): Promise<any> {
        return await UserUpdaterRequest.validator(UserUpdaterRequest.schema(), data)
    }

    /**
     * 
     * @returns
     */
    static schema(): object {
        return {
            id: [
                UserUpdaterRequest.required,
                UserUpdaterRequest.numeric
            ],
            email: [
                UserUpdaterRequest.required,
                UserUpdaterRequest.string,
                UserUpdaterRequest.email,
            ],
            first_name: [
                UserUpdaterRequest.required,
                UserUpdaterRequest.string,
            ],
            last_name: [
                UserUpdaterRequest.required,
                UserUpdaterRequest.string,
            ],
            dob: [
                UserUpdaterRequest.required,
                UserUpdaterRequest.string
            ],
            timezone: [
                UserUpdaterRequest.required,
                UserUpdaterRequest.string
            ]
        };
    }
}
