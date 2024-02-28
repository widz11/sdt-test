/**
 * Interface MailReSenderActionInterface
 */
export interface MailReSenderActionInterface {
    /**
     * 
     * @param request
     * @returns
     */
    process(request: any): Promise<any>;
}