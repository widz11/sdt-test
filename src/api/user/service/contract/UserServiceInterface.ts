import { UserModelInterface } from "../../model/contract/UserModelInterface";

/**
 * Interface UserServiceInterface
 */
export interface UserServiceInterface {
    /**
     * 
     * @param request
     * @returns
     */
    getUsers(request: any): Promise<UserModelInterface[]>;

    /**
     * 
     * @param request
     * @returns
     */
    create(request: any): Promise<UserModelInterface>;

    /**
     * 
     * @param request
     * @returns
     */
    update(request: any): Promise<UserModelInterface>;

    /**
     * 
     * @param request
     * @returns
     */
    delete(request: any): Promise<UserModelInterface>;
}