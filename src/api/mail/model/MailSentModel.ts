import { Entity, Index, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { BaseModel } from "../../../lib/database/mysql/model/BaseModel";
import { MailSentModelInterface } from "./contract/MailSentModelInterface";
import { UserModel } from "../../user/model/UserModel";
import { MailTemplateModel } from "./MailTemplateModel";
import { UserModelInterface } from "../../user/model/contract/UserModelInterface";
import { MailTemplateModelInterface } from "./contract/MailTemplateModelInterface";

@Entity("mail_sent")
@Index(["id"], { unique: true })
export class MailSentModel
	extends BaseModel
	implements MailSentModelInterface
{
	@PrimaryGeneratedColumn({ type: "bigint" })
	id: number | undefined;

	@Column({
		type: "bigint",
        unsigned: true,
        default: 0
	})
	user_id!: number;

    @Column({
		type: "bigint",
        unsigned: true,
        default: 0
	})
	admin_id!: number;

    @Column({
		type: "bigint",
        unsigned: true,
        default: 0
	})
    mail_template_id!: number;

    @Column({
		type: "bigint",
        unsigned: true,
        default: 0
	})
	batch!: number;

	@Column({
		type: "enum",
        enum: ["failed", "processing", "success"],
        default: "processing"
	})
	status!: string;

    @Column({
		type: "bigint",
        unsigned: true,
        default: 0
	})
	send_at!: number;

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

	@OneToOne(() => UserModel)
	@JoinColumn({ name: "user_id" })
	user!: UserModel;

	@OneToOne(() => MailTemplateModel)
	@JoinColumn({ name: "mail_template_id" })
	template!: MailTemplateModel;

	/**
	 * RELATIONS
	 * =================================================================================================================
	 */
	getUser(): UserModelInterface {
		return this.user;
	}

	getTemplate(): MailTemplateModelInterface {
		return this.template;
	}

	/**
	 * GETTER
	 * =================================================================================================================
	 */

	getUserID(): number {
        return typeof this.user_id == "string" && this.user_id ? parseInt(this.user_id) : 0;
    }

	getMailTemplateID(): number {
        return typeof this.mail_template_id == "string" && this.mail_template_id ? parseInt(this.mail_template_id) : 0;
    }

    getAdminID(): number {
        return typeof this.admin_id == "string" && this.admin_id ? parseInt(this.admin_id) : 0;
    }

    getBatch(): number {
        return this.batch ?? "";
    }

    getStatus(): string {
        return this.status ? this.status : "";
    }

    getSendAt(): number {
        return this.send_at ?? "";
    }
}
