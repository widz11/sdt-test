import { DisplayableException } from "../../exception/DisplayableException";

/**
 * Class ValidateRequestException
 */
export class ValidateRequestException extends DisplayableException {
    /**
     *
     * @private
     */
    public error_message: string;
    /**
     *
     * @private
     */
    public code: number;
    /**
     *
     * @private
     */
    public data: any;
    /**
     *
     * @private
     */
    private error_code: any;

    /**
     *
     * @param data
     * @param message
     * @param error_code
     * @param status_code
     */
    constructor(
        data: any, 
        message = "The requested parameter is invalid", 
        error_code: any = "422", 
        http_code = 422
    ) {
        super(message, 'request.validation');
        this.error_message = message
        this.error_code = error_code
        this.code = http_code;
        this.data = data;
        Object.setPrototypeOf(this, ValidateRequestException.prototype);
    }
}
