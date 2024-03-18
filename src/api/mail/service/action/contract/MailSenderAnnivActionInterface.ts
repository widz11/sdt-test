/**
 * Interface MailSenderAnnivActionInterface
 */
export interface MailSenderAnnivActionInterface {
    process(
        mailAction: string,
        date: string,
    ): Promise<void>
}