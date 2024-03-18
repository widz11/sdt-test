import { UserRepositoryInterface } from "./../api/user/repository/contract/UserRepositoryInterface";
import { UserRepository } from "../api/user/repository/UserRepository";
import { Dateparser } from "../lib/date/Dateparser";

/**
 * Class UserSeeder
 */
export class UserSeeder {
    protected repository: UserRepositoryInterface;
    protected totalUsers: number = 10;
    protected timeZone: string = "Asia/Jakarta";
    protected dob: string = "1990-03-18";

    /**
     * Constructor
     */
    constructor() {
        this.repository = new UserRepository();
    }
    
    /**
     * Run seeder
     */
    async run(): Promise<void> {
        const dataList = this.getData();
        for (const data of dataList) {
            const user = await this.repository.findByEmail(data.email);
            if (!user) {
                // Create new
                await this.repository.create(data);
            } else {
                // Update
                await this.repository.update(user.getID(), data);
            }
        }
    }

    /**
     * 
     * @returns
     */
    private getData(): any[] {
        const result = [];
        const timestamp = Dateparser.unixNow();
        for (let i = 0; i < this.totalUsers; i++) {
            result.push({
                email: `user_${i+1}_${timestamp}@xxx.com`,
                first_name: `User ${i+1}`,
                last_name: `${timestamp}`,
                dob: this.dob,
                timezone: this.timeZone
            });
        }
        return result;
    }
}