import { MigrationInterface, QueryRunner } from "typeorm";
import { UserSeeder } from "../seeds/UserSeeder";

export class UserSeeder1709092947650 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await (new UserSeeder).run();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
