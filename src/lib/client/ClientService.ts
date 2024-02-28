import { SERVICE_UNAVAILABLE } from '../exception/MessageException';
import { ClientException } from './exception/ClientException';
import { ClientResponse } from './ClientResponse';
import { AbstractClientService } from "./abstract/AbstractClientService";

/**
 * Class ClientService
 */
export class ClientService extends AbstractClientService
{
    /**
     *
     * @returns 
     */
    async validation(): Promise<boolean> {
        return true
    }

    /**
     * 
     * @param input 
     * @returns 
     */
    async generatePayload(input: any): Promise<any> {
        return input
    }
 
    /**
     * 
     * @param input 
     * @returns 
     */
    async handle(input: any): Promise<any> {
        return await this.client.handle(this.getPayload(), await this.getUrl(), this.getMethod(), this.getOptions())
    }
 
    /**
     * 
     * @param response 
     * @returns 
     */
    async handleSuccess(response: ClientResponse): Promise<any> {
        return response.getResponse()
    }
 
    /**
     * 
     * @param response 
     */
    async handleDecline(response: ClientResponse): Promise<any> {
        throw new ClientException({
            service: response.getService(),
            status: response.getStatus(), 
            message: response.getMessage() ?? response.getStatusText(),
            response: response.getResponseData()
        }, response.getMessage());
    }
 
    /**
     * 
     * @param exception 
     */
    async handleTimeout(exception: any): Promise<any> {
        if(exception instanceof ClientException) {
            throw exception
        }
        
        // Timeout
        throw new ClientException({
            message: exception.message,
        }, SERVICE_UNAVAILABLE.message)
    }

    /**
     * 
     * @param response 
     */
     async isSuccess(response: ClientResponse): Promise<boolean> {
        return response.isSuccess()
    }
}