import { UserModelInterface } from "../../model/contract/UserModelInterface";
import { AbstractUserCreatorAction } from "./abstract/AbstractUserCreatorAction";
import { UserUpdaterActionInterface } from "./contract/UserUpdaterActionInterface";

/**
 * Class UserUpdaterAction
 */
export class UserUpdaterAction 
    extends AbstractUserCreatorAction
    implements UserUpdaterActionInterface
{
    /**
     * 
     * @param request
     * @returns
     */
    async handle(request: any): Promise<UserModelInterface> {
        const { 
            id,
            email, 
            first_name,
            last_name,
            dob,
            timezone
        } = request ?? {};
        const user = await this.validateIsExistByID(id);
        return await this.repository.update(user.getID(), {
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
        const { id, email } = request ?? {};
        const user = await this.validateIsExistByID(id);
        await Promise.all([
            await this.validateIsExistEmail(email, user.getID())
        ]);
    }
}