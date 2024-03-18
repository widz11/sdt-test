/**
 * Interface MailServiceInterface
 */
export interface MailServiceInterface {
    /**
     * 
     * @param mailAction
     * @param date
     * @returns
     */
    sendMailBirthday(
        mailAction: string,
        date: string
    ): Promise<void>;

    /**
     * 
     * @param mailAction
     * @param date
     * @returns
     */
    sendMailAnniv(
        mailAction: string,
        date: string
    ): Promise<void>;

    /**
     * 
     * @param data
     */
    mailWorker(
        data: any
    ): Promise<void>;

    /**
     * 
     * @param request
     * @returns
     */
    reSendMail(request: any): Promise<any>;
}