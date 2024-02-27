import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmailTemplateTableMigration1709024323609 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`mail_template\` (
            \`id\` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            \`name\` VARCHAR(50) NOT NULL,
            \`message\` VARCHAR(255) NULL,
            \`created_at\` TIMESTAMP NULL DEFAULT NULL,
            \`updated_at\` TIMESTAMP NULL DEFAULT NULL,
            PRIMARY KEY (\`id\`),
            UNIQUE INDEX \`mail_name_unq\` (\`name\` ASC)
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS \`mail_template\``);
    }

}
