import { DisplayableException } from "../../../../../lib/exception/DisplayableException";
import { UserException } from "../../../exception/UserException";
import { UserModelInterface } from "../../../model/contract/UserModelInterface";
import { AbstractUserAction } from "./AbstractUserAction";

/**
 * Abstract Class AbstractUserCreatorAction
 */
export abstract class AbstractUserCreatorAction extends AbstractUserAction {
    /**
     * @protected
     */
    protected user!: UserModelInterface;
    
    /**
     * 
     * @param request
     * @returns
     */
    async process(request: any): Promise<UserModelInterface> {
        await this.validate(request);
        try {
            this.user = await this.handle(request);
        } catch(e) {
            await this.handleError(e);
        }
        return this.user;
    }

    /**
     * 
     * @param request
     * @returns
     */
    abstract validate(request: any): Promise<void>;

    /**
     * 
     * @param request
     * @returns
     */
    abstract handle(request: any): Promise<UserModelInterface>;

    /**
     * 
     * @param e
     */
    async handleError(e: any): Promise<void> {
        if (e instanceof DisplayableException) {
			throw e;
		}
		throw new UserException({}, "Failed process");
    }

    /**
     * 
     * @param email
     */
    async validateIsExistEmail(email: string, exceptID: number|null = null): Promise<void> {
        const user = await this.repository.findByEmail(email);
        if (user) {
            if (user.getID() != exceptID) {
                throw new UserException({
                    email: email,
                }, "Email already exist");
            }
        }
    }

    /**
     * 
     * @param id
     * @returns
     */
    async validateIsExistByID(id: number): Promise<UserModelInterface> {
        const user = await this.repository.findByID(id);
        if (!user) {
            throw new UserException({}, "User not found");
        }
        return user;
    }
}