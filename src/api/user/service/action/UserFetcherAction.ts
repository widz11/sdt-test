import { UserModelInterface } from "../../model/contract/UserModelInterface";
import { AbstractUserAction } from "./abstract/AbstractUserAction";
import { UserFetcherActionInterface } from "./contract/UserFetcherActionInterface";

/**
 * Class UserFetcherAction
 */
export class UserFetcherAction 
    extends AbstractUserAction
    implements UserFetcherActionInterface
{
    /**
     * 
     * @param request
     * @returns
     */
    async process(request: any): Promise<UserModelInterface[]> {
        return await this.repository.getUsers();
    }
}