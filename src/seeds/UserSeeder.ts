import { UserRepositoryInterface } from "./../api/user/repository/contract/UserRepositoryInterface";
import { UserRepository } from "../api/user/repository/UserRepository";

/**
 * Class UserSeeder
 */
export class UserSeeder {
    protected repository: UserRepositoryInterface;

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
        return [
            {
                email: "userx1@xxx.com",
                first_name: "user 1",
                last_name: "xxx",
                dob: "1990-01-01",
                timezone: "Asia/Jakarta"
            }
        ]
    }
}