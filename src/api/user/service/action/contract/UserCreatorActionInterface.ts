import { UserModelInterface } from "../../../model/contract/UserModelInterface";

/**
 * Interface UserCreatorActionInterface
 */
export interface UserCreatorActionInterface {
    /**
     * 
     * @param request
     * @returns
     */
    process(request: any): Promise<UserModelInterface>;   
}