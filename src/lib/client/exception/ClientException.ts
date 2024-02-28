import { DisplayableException } from '../../exception/DisplayableException';

/**
 * class ClientException
 */
export class ClientException extends DisplayableException {
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
     * @param data
     * @param message
     * @param status_code
     * @param service
     */
    constructor(data: any = {}, message: string = '', status_code: number = 422, service: string = 'client') {
        super(message, service);
        this.error_message = message
        this.code = status_code;
        this.data = data;

        Object.setPrototypeOf(this, ClientException.prototype)
    }
}