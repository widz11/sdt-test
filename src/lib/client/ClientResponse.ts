const SUCCESS_CODE = 200
const SUCCESS_STATUS = true

/**
 * Class ClientResponse
 */
export class ClientResponse
{
    protected response: any

    /**
     * 
     * @param response 
     */
    constructor(response: any = {}) {
        this.response = response ? response : {}
    }

    /**
     * 
     * @returns 
     */
    getStatus(): any {
        return this.response.status
    }

    /**
     * 
     * @returns 
     */
    getStatusText(): any {
        return this.response.statusText
    }

    /**
     * 
     * @returns 
     */
    getHeaders(): any {
        return this.response.headers
    }

    /**
     * 
     * @returns 
     */
    getResponse(): any {
        return this.response
    }

    /**
     * 
     * @returns 
     */
    getResponseData(): any {
        return this.response ? (this.response.data ?? {}) : {}
    }

    /**
     * 
     * @returns 
     */
    getErrorCode(): any {
        return this.response.error_code
    }

    /**
     * 
     * @returns 
     */
    getError(): any {
        return this.response.errors
    }

    /**
     * 
     * @returns 
     */
    getMessage(): any {
        return this.response.message
    }

    /**
     * 
     * @returns 
     */
    getService(): any {
        return this.response.service
    }

    /**
     * 
     * @returns 
     */
    isSuccess(): boolean {
        return this.response.status == SUCCESS_CODE || this.response.status == SUCCESS_STATUS 
            ? true : false
    }
}