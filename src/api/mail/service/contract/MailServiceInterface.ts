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
    sendMail(
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
}