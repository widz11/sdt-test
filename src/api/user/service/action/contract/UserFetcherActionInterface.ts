import { UserModelInterface } from "../../../model/contract/UserModelInterface";

/**
 * Interface UserFetcherActionInterface
 */
export interface UserFetcherActionInterface {
    /**
     * 
     * @param request
     * @returns
     */
    process(request: any): Promise<UserModelInterface[]>;
}