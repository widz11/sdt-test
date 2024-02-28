import { UserService } from "../service/UserService";
import { UserServiceInterface } from "../service/contract/UserServiceInterface";
import { UserCreatorRequest } from "../middleware/request/UserCreatorRequest";
import { UserDeleteRequest } from "../middleware/request/UserDeleteRequest";
import { UserFetcherRequest } from "../middleware/request/UserFetcherRequest";
import { UserTransformer } from "../transformer/UserTransformer";

export class UserController {
    protected service: UserServiceInterface;

    /**
     * Constructor
     */
    constructor() {
        this.service = new UserService();
    }

    /**
	 *
	 * @param request
     * @returns
	 */
	async getUsers(
		request: any
	): Promise<any> {
		return await new UserTransformer(
			await this.service.getUsers(
				await UserFetcherRequest.check(request)
			)
		).json();
	}

    /**
	 *
	 * @param request
     * @returns
	 */
	async create(
		request: any
	): Promise<any> {
		return await new UserTransformer(
			await this.service.create(
				await UserCreatorRequest.check(request)
			)
		).json();
	}

    /**
	 *
	 * @param request
     * @returns
	 */
	async update(
		request: any
	): Promise<any> {
		return await new UserTransformer(
			await this.service.update(
				await UserCreatorRequest.check(request)
			)
		).json();
	}

    /**
	 *
	 * @param request
     * @returns
	 */
	async delete(
		request: any
	): Promise<any> {
		return await new UserTransformer(
			await this.service.delete(
				await UserDeleteRequest.check(request)
			)
		).json();
	}
}