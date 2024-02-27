import { UserModelInterface } from "../../../model/contract/UserModelInterface";

/**
 * Interface UserDeleteActionInterface
 */
export interface UserDeleteActionInterface {
    /**
     * 
     * @param request
     * @returns
     */
    process(request: any): Promise<UserModelInterface>;   
}