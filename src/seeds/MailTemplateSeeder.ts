import { MailTemplateRepository } from "../api/mail/repository/MailTemplateRepository";
import { MailTemplateRepositoryInterface } from "../api/mail/repository/contract/MailTemplateRepositoryInterface";

/**
 * Class MailTemplateSeeder
 */
export class MailTemplateSeeder {
    protected repository: MailTemplateRepositoryInterface;

    /**
     * Constructor
     */
    constructor() {
        this.repository = new MailTemplateRepository();
    }
    
    /**
     * Run seeder
     */
    async run(): Promise<void> {
        const dataList = this.getData();
        for (const data of dataList) {
            const mailTemplate = await this.repository.findByName(data.name);
            if (!mailTemplate) {
                // Create new mail template
                await this.repository.create(data);
            } else {
                // Update mail template
                await this.repository.update(mailTemplate.getID(), data);
            }
        }
    }

    /**
     * 
     * @returns
     */
    private getData(): any[] {
        return [
            {
                id: 1,
                name: "mail-birthday",
                message: "It's your birthday."
            },
            {
                id: 2,
                name: "mail-anniversary",
                message: "It's company anniversary."
            }
        ]
    }
}