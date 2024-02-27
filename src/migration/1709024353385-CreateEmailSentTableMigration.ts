import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmailSentTableMigration1709024353385 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`mail_sent\` (
            \`id\` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            \`user_id\` BIGINT(20) UNSIGNED NOT NULL DEFAULT '0',
            \`mail_template_id\` BIGINT(20) UNSIGNED NOT NULL DEFAULT '0',
            \`admin_id\` BIGINT(20) UNSIGNED NOT NULL DEFAULT '0',
            \`batch\` INT UNSIGNED DEFAULT 0,
            \`status\` ENUM("failed", "processing", "success") NOT NULL DEFAULT 'processing',
            \`sent_at\` INT UNSIGNED DEFAULT 0,
            \`created_at\` TIMESTAMP NULL DEFAULT NULL,
            \`updated_at\` TIMESTAMP NULL DEFAULT NULL,
            PRIMARY KEY (\`id\`),
            KEY \`mail_sent_user_id_fk\` (\`user_id\`),
            CONSTRAINT \`mail_sent_user_id_fk\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION,
            KEY \`mail_sent_mail_template_id_fk\` (\`mail_template_id\`),
            CONSTRAINT \`mail_template_id_fk\` FOREIGN KEY (\`mail_template_id\`) REFERENCES \`mail_template\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS \`mail_sent\``);
    }

}
