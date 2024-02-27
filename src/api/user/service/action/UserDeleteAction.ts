import { UserModelInterface } from "../../model/contract/UserModelInterface";
import { AbstractUserCreatorAction } from "./abstract/AbstractUserCreatorAction";
import { UserDeleteActionInterface } from "./contract/UserDeleteActionInterface";

/**
 * Class UserDeleteAction
 */
export class UserDeleteAction 
    extends AbstractUserCreatorAction
    implements UserDeleteActionInterface
{
    /**
     * 
     * @param request
     * @returns
     */
    async handle(request: any): Promise<UserModelInterface> {
        const { id } = request ?? {};
        const user = await this.validateIsExistByID(id);
        await this.repository.delete(user.getID());
        return user;
    }

    /**
     * 
     * @param request
     */
    async validate(request: any): Promise<void> {}
}