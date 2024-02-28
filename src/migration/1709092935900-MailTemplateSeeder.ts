import { MigrationInterface, QueryRunner } from "typeorm";
import { MailTemplateSeeder } from "../seeds/MailTemplateSeeder";

export class MailTemplateSeeder1709092935900 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await (new MailTemplateSeeder).run();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
