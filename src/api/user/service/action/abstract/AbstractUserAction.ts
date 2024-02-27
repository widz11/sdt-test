import { UserRepository } from "../../../repository/UserRepository";
import { UserRepositoryInterface } from "../../../repository/contract/UserRepositoryInterface";

/**
 * Abstract Class AbstractUserAction
 */
export abstract class AbstractUserAction {
    /**
     * @protected
     */
    protected repository: UserRepositoryInterface;

    /**
     * Constructor
     */
    constructor() {
        this.repository = new UserRepository();
    }
}