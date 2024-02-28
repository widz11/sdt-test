import { ClientResponse } from '../ClientResponse';
import { ClientHttpRequestService } from '../ClientHttpRequestService';

/**
 * Abstract Class AbstractClientService
 */
export abstract class AbstractClientService
{
    protected client: ClientHttpRequestService
    protected response: ClientResponse
    protected baseUrl: string
    protected path: string
    protected method: string
    protected payload: any
    protected options: any

    /**
     * Constructor
     */
    constructor(
        baseUrl = ''
    ) { 
        this.client = new ClientHttpRequestService
        this.response = new ClientResponse
        this.baseUrl = baseUrl
        this.path = ''
        this.method = ''
        this.payload = {}
        this.options = {}
    }

    /**
     * 
     * @param input 
     * @param path 
     * @param method 
     * @param options 
     */
    async process(input: any, path: string, method: string, options: any): Promise<any>
    {
        // Init
        this.setPath(path);
        this.setMethod(method);
        this.setOptions(options);

        // Handle Payload
        [,this.payload] = await Promise.all([
            await this.validation(),
            await this.generatePayload(input)
        ])

        try {
            // Handle
            const response = await this.handle(this.payload)
            
            // Handle Response
            this.response = new ClientResponse(response)
            if(await this.isSuccess(this.response)) {
                return await this.handleSuccess(this.response)
            } else {
                return await this.handleDecline(this.response)
            }
        } catch(exception) {
            return await this.handleTimeout(exception)
        }
    }

    /**
     *
     */
    abstract validation(): Promise<boolean>

    /**
     * 
     * @param input 
     */
    abstract generatePayload(input: any): Promise<any>

    /**
     * 
     * @param input 
     */
    abstract handle(input: any): Promise<any>

    /**
     *
     * @param response
     */
    abstract handleSuccess(response: ClientResponse): Promise<any>

    /**
     * 
     * @param response 
     */
    abstract handleDecline(response: ClientResponse): Promise<any>

    /**
     *
     * @param exception
     */
    abstract handleTimeout(exception: any): Promise<any>

    /**
     * 
     * @param response 
     */
    abstract isSuccess(response: ClientResponse): Promise<boolean>

    // SETTER
    /**
     * 
     * @param path 
     */
    setPath(path: string) {
        this.path = path
    }

    /**
     * 
     * @param method 
     */
    setMethod(method: string) {
        this.method = method
    }

    /**
     * 
     * @param options 
     */
    setOptions(options: any) {
        this.options = options
    }

    // GETTER
    /**
     * 
     * @returns 
     */
    async getBaseUrl(): Promise<string> {
        return this.baseUrl.replace(/^\/|\/$/g, '').trim()
    }

    /**
     * 
     * @returns 
     */
    getPath(): string {
        return this.path.replace(/^\/|\/$/g, '').trim()
    }

    /**
     * 
     * @returns 
     */
    getMethod(): string {
        return this.method
    }

    /**
     * 
     * @returns 
     */
    getPayload(): any {
        return this.payload
    }

    /**
     * 
     * @returns 
     */
    getOptions(): any {
        return this.options
    }

    /**
     * 
     * @returns 
     */
    async getUrl(): Promise<string> {
        return await this.getBaseUrl() + '/' + this.getPath() 
    }

    /**
     * 
     * @returns 
     */
    getResponse(): ClientResponse{
        return this.response
    }
}