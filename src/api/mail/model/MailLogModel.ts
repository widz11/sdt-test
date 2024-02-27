import { Entity, Index, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseModel } from "../../../lib/database/mysql/model/BaseModel";
import { MailLogModelInterface } from "./contract/MailLogModelInterface";

@Entity("mail_log")
@Index(["id"], { unique: true })
export class MailLogModel
	extends BaseModel
	implements MailLogModelInterface
{
	@PrimaryGeneratedColumn({ type: "bigint" })
	id: number | undefined;

	@Column({
		type: "bigint",
        unsigned: true,
        default: 0
	})
	mail_sent_id!: number;

	@Column({
		type: "varchar",
        length: 255,
        nullable: true,
        default: null
	})
	exception!: string;

	@Column({
		type: "timestamp",
		default: null,
	})
	created_at!: string;

	@Column({
		type: "timestamp",
		default: null,
	})
	updated_at!: string;

	/**
	 * GETTER
	 * =================================================================================================================
	 */

	getMailSentID(): number {
        return typeof this.mail_sent_id == "string" && this.mail_sent_id ? parseInt(this.mail_sent_id) : 0;
    }

    getException(): string {
        return this.exception ? this.exception : "";
    }
}
