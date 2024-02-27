import {
	EntityTarget,
	Repository,
	ObjectLiteral,
	EntityManager,
	DataSource,
} from "typeorm";
import { Dateparser } from "../../../date/Dateparser";
import { MainDataSource } from "../MainDataSource";
import { BaseRepositoryInterface } from "./contract/BaseRepositoryInterface";

/**
 * Class BaseRepository
 */
export abstract class BaseRepository implements BaseRepositoryInterface {
	/**
	 *
	 * @protected
	 */
	protected repository: Repository<any>;
	/**
	 * @protected
	 */
	protected model: any;
	/**
	 *
	 * @protected
	 */
	protected dataSource: DataSource;

	/**
	 * Constructor
	 */
	protected constructor(
		model: EntityTarget<ObjectLiteral>,
		external = false,
		dataSource: DataSource | null = null
	) {
		this.dataSource = MainDataSource;
		if (external) {
			this.dataSource = dataSource ? dataSource : MainDataSource;
		}
		this.repository = this.dataSource.getRepository(model);
		this.model = model;
	}

	/**
	 *
	 * @param input
	 */
	async create(input: any) {
		const objModel = {};
		input.created_at = Dateparser.databaseFormat();
		input.updated_at = Dateparser.databaseFormat();
		const createdObj = await this.repository.save(
			this.repository.create(input)
		);
		return Object.assign(objModel, createdObj);
	}

	/**
	 *
	 * @param id
	 * @param input
	 */
	async update(id: number, input: Partial<any>) {
		const objModel = {};
		input.updated_at = Dateparser.databaseFormat();
		await this.repository.update({ id }, input);
		const updatedObj = await this.repository.findOneByOrFail({ id: id });
		return Object.assign(objModel, updatedObj);
	}

	/**
	 *
	 * @param objectId
	 */
	delete(objectId: number) {
		return this.repository.delete({ id: objectId });
	}

	/**
	 *
	 * @param input
	 * @param entityManager
	 * @returns
	 */
	async findByWithEntityManager(
		input: any,
		entityManager: EntityManager
	): Promise<any> {
		return await entityManager.findBy(this.model, input);
	}

	/**
	 *
	 * @param input
	 * @param entityManager
	 * @returns
	 */
	async findOneByWithEntityManager(
		input: any,
		entityManager: EntityManager
	): Promise<any> {
		return await entityManager.findOneBy(this.model, input);
	}

	/**
	 *
	 * @param input
	 * @param entityManager
	 * @returns
	 */
	async createWithEntityManager(
		input: any,
		entityManager: EntityManager
	): Promise<{ data: any; entityManager: EntityManager }> {
		input.created_at = Dateparser.databaseFormat();
		input.updated_at = Dateparser.databaseFormat();
		const data = await entityManager.save(
			await entityManager.create(this.model, input)
		);
		return {
			data: data,
			entityManager: entityManager,
		};
	}

	/**
	 *
	 * @param id
	 * @param input
	 * @param entityManager
	 * @return
	 */
	async updateWithEntityManager(
		id: number,
		input: Partial<any>,
		entityManager: EntityManager
	): Promise<{ data: any; entityManager: EntityManager }> {
		input.updated_at = Dateparser.databaseFormat();
		await entityManager.update(this.model, { id }, input);
		const data = await entityManager.findOneBy(this.model, { id });
		return {
			data: data,
			entityManager: entityManager,
		};
	}

	/**
	 *
	 * @param id
	 * @param entityManager
	 * @returns
	 */
	async deleteWithEntityManager(
		id: number,
		entityManager: EntityManager
	): Promise<{ data: any; entityManager: EntityManager }> {
		const data = await entityManager.findOneBy(this.model, { id });
		await entityManager.delete(this.model, { id });
		return {
			data: data,
			entityManager: entityManager,
		};
	}

	/**
	 *
	 * @param cb
	 * @returns
	 */
	async transaction(cb: any): Promise<any> {
		return await this.dataSource.manager.transaction(cb);
	}
}
