import { UserModelInterface } from "../../../model/contract/UserModelInterface";

/**
 * Interface UserUpdaterActionInterface
 */
export interface UserUpdaterActionInterface {
    /**
     * 
     * @param request
     * @returns
     */
    process(request: any): Promise<UserModelInterface>;   
}