/**
 * Interface MailSenderBirthdayActionInterface
 */
export interface MailSenderBirthdayActionInterface {
    process(
        mailAction: string,
        date: string,
    ): Promise<void>
}