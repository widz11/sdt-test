import { Entity, Index, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseModel } from "../../../lib/database/mysql/model/BaseModel";
import { MailTemplateModelInterface } from "./contract/MailTemplateModelInterface";

@Entity("mail_template")
@Index(["id"], { unique: true })
export class MailTemplateModel
	extends BaseModel
	implements MailTemplateModelInterface
{
	@PrimaryGeneratedColumn({ type: "bigint" })
	id: number | undefined;

	@Column({
		type: "varchar",
		length: 50
	})
	name!: string;

	@Column({
		type: "varchar",
		length: 255,
		nullable: true,
		default: null
	})
	message!: string;

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

	getName(): string {
		return this.name ?? "";
	}

	getMessage(): string {
		return this.message ?? "";
	}

	/**
	 * MUTATOR
	 * =================================================================================================================
	 */
	generateMessage(name: string): string {
		return `Hey, ${name} it's your birthday.`
	}
}
