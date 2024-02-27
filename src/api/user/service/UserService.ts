import { UserModelInterface } from "../model/contract/UserModelInterface";
import { UserCreatorAction } from "./action/UserCreatorAction";
import { UserDeleteAction } from "./action/UserDeleteAction";
import { UserFetcherAction } from "./action/UserFetcherAction";
import { UserUpdaterAction } from "./action/UserUpdaterAction";
import { UserCreatorActionInterface } from "./action/contract/UserCreatorActionInterface";
import { UserDeleteActionInterface } from "./action/contract/UserDeleteActionInterface";
import { UserFetcherActionInterface } from "./action/contract/UserFetcherActionInterface";
import { UserUpdaterActionInterface } from "./action/contract/UserUpdaterActionInterface";
import { UserServiceInterface } from "./contract/UserServiceInterface";

/**
 * Class UserService
 */
export class UserService implements UserServiceInterface {
    protected fetcherAction: UserFetcherActionInterface;
    protected creatorAction: UserCreatorActionInterface;
    protected updaterAction: UserUpdaterActionInterface;
    protected deleteAction: UserDeleteActionInterface;

    /**
     * Constructor
     */
    constructor() {
        this.fetcherAction = new UserFetcherAction();
        this.creatorAction = new UserCreatorAction();
        this.updaterAction = new UserUpdaterAction();
        this.deleteAction = new UserDeleteAction();
    }
    
    /**
     * 
     * @param request
     * @returns
     */
    async getUsers(request: any): Promise<UserModelInterface[]> {
        return await this.fetcherAction.process(request);
    }

    /**
     * 
     * @param request
     * @returns
     */
    async create(request: any): Promise<UserModelInterface> {
        return await this.creatorAction.process(request);
    }

    /**
     * 
     * @param request
     * @returns
     */
    async update(request: any): Promise<UserModelInterface> {
        return await this.updaterAction.process(request);
    }

    /**
     * 
     * @param request
     * @returns
     */
    async delete(request: any): Promise<UserModelInterface> {
        return await this.deleteAction.process(request);    
    }
}