import { UserModelInterface } from "../../model/contract/UserModelInterface";
import { AbstractUserCreatorAction } from "./abstract/AbstractUserCreatorAction";
import { UserCreatorActionInterface } from "./contract/UserCreatorActionInterface";

/**
 * Class UserCreatorAction
 */
export class UserCreatorAction 
    extends AbstractUserCreatorAction
    implements UserCreatorActionInterface
{
    /**
     * 
     * @param request
     * @returns
     */
    async handle(request: any): Promise<UserModelInterface> {
        const { 
            email, 
            first_name,
            last_name,
            dob,
            timezone
        } = request ?? {};
        return await this.repository.create({
            email: email,
            first_name: first_name,
            last_name: last_name,
            dob: dob,
            timezone: timezone
        })
    }

    /**
     * 
     * @param request
     */
    async validate(request: any): Promise<void> {
        const { email } = request ?? {};
        await Promise.all([
            await this.validateIsExistEmail(email)
        ]);
    }
}