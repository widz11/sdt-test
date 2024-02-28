/**
 * Interface MailSenderActionInterface
 */
export interface MailSenderActionInterface {
    process(
        mailAction: string,
        date: string,
    ): Promise<void>
}