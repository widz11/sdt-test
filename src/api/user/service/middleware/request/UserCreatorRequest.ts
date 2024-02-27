import { RequestValidation } from "../../../../../lib/validation/request/RequestValidation";

/**
 * Class UserCreatorRequest
 */
export class UserCreatorRequest extends RequestValidation {
    /**
     *
     * @param data
     */
    static async check(data: any): Promise<any> {
        return await UserCreatorRequest.validator(UserCreatorRequest.schema(), data)
    }

    /**
     * 
     * @returns
     */
    static schema(): object {
        return {
            email: [
                UserCreatorRequest.required,
                UserCreatorRequest.string,
                UserCreatorRequest.email,
            ],
            first_name: [
                UserCreatorRequest.required,
                UserCreatorRequest.string,
            ],
            last_name: [
                UserCreatorRequest.required,
                UserCreatorRequest.string,
            ],
            dob: [
                UserCreatorRequest.required,
                UserCreatorRequest.string
            ],
            timezone: [
                UserCreatorRequest.required,
                UserCreatorRequest.string
            ]
        };
    }
}
