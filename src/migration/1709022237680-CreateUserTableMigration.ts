import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTableMigration1709022237680 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`user\` (
            \`id\` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            \`email\` VARCHAR(255) NOT NULL,
            \`first_name\` VARCHAR(50) NOT NULL,
            \`last_name\` VARCHAR(50) NULL,
            \`dob\` DATE NOT NULL,
            \`timezone\` VARCHAR(50),
            \`created_at\` TIMESTAMP NULL DEFAULT NULL,
            \`updated_at\` TIMESTAMP NULL DEFAULT NULL,
            PRIMARY KEY (\`id\`),
            UNIQUE INDEX \`user_email_unq\` (\`email\` ASC)
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS \`user\``);
    }

}
