import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMailLogTableMigration1709024405844 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`mail_log\` (
            \`id\` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            \`mail_sent_id\` BIGINT(20) UNSIGNED NOT NULL DEFAULT '0',
            \`exception\` VARCHAR(255) NULL,
            \`created_at\` TIMESTAMP NULL DEFAULT NULL,
            \`updated_at\` TIMESTAMP NULL DEFAULT NULL,
            PRIMARY KEY (\`id\`),
            KEY \`mail_log_mail_sent_id_fk\` (\`mail_sent_id\`),
            CONSTRAINT \`mail_log_mail_sent_id_fk\` FOREIGN KEY (\`mail_sent_id\`) REFERENCES \`mail_sent\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS \`mail_og\``);
    }

}
