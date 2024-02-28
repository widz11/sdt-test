import {SERVICE_UNAVAILABLE} from '../exception/MessageException';
import {ClientException} from './exception/ClientException';
import axios from 'axios';

/**
 * Class ClientHttpRequestService
 */
export class ClientHttpRequestService
{
    /**
     *
     * @param payload
     * @param url
     * @param method
     * @param options
     * @returns {Promise<*|{data, status}>}
     */
     async handle(payload: any = {},
                  url: string = '',
                  method: string = 'POST',
                  options: any = {}): Promise<any | { data: any; status: any; }> {
        try {
            let { headers } = options ?? {};
            headers = headers ?? JSON.stringify({});
            // return await axios({
            //     headers: JSON.parse(headers) ?? {
            //         'Content-Type': 'application/json',
            //         'Accept': 'application/json'
            //     },
            //     method: method,
            //     url: url,
            //     data: JSON.stringify(payload)
            // });
            return {
                status: true,
                message: 'success',
                data: {
                    "status": "sent",
                    "sentTime": "2022-07-01T14:48:00.000Z"
                }   
            }
        } catch (e: any) {
            // Handle decline
            if (e.response) {
                return e.response
            }
            // Handle timeout
            throw new ClientException({
                message: e.message
            }, SERVICE_UNAVAILABLE.message);
        }
    }
}