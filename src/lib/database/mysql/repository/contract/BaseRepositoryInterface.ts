import { EntityManager } from "typeorm";

/**
 * Interface BaseRepositoryInterface
 */
export interface BaseRepositoryInterface {
	/**
	 *
	 * @param input
     * @returns
	 */
	create(input: any): Promise<any>;

	/**
	 *
	 * @param id
	 * @param input
     * @returns
	 */
	update(id: number, input: Partial<any>): Promise<any>;

	/**
	 *
	 * @param objectId
     * @returns
	 */
	delete(objectId: number): any;

	/**
	 *
	 * @param input
	 * @param entityManager
	 * @returns
	 */
	findByWithEntityManager(
		input: any,
		entityManager: EntityManager
	): Promise<any>;

	/**
	 *
	 * @param input
	 * @param entityManager
	 * @returns
	 */
	findOneByWithEntityManager(
		input: any,
		entityManager: EntityManager
	): Promise<any>;

	/**
	 *
	 * @param input
	 * @param entityManager
	 * @returns
	 */
	createWithEntityManager(
		input: any,
		entityManager: EntityManager
	): Promise<{ data: any; entityManager: EntityManager }>;

	/**
	 *
	 * @param id
	 * @param input
	 * @param entityManager
	 * @return
	 */
	updateWithEntityManager(
		id: number,
		input: Partial<any>,
		entityManager: EntityManager
	): Promise<{ data: any; entityManager: EntityManager }>;

	/**
	 *
	 * @param id
	 * @param entityManager
	 * @returns
	 */
	deleteWithEntityManager(
		id: number,
		entityManager: EntityManager
	): Promise<{ data: any; entityManager: EntityManager }>;

	/**
	 *
	 * @param cb
	 * @returns
	 */
	transaction(cb: any): Promise<any>;
}