import { Entity, Index, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseModel } from "../../../lib/database/mysql/model/BaseModel";
import { UserModelInterface } from "./contract/UserModelInterface";

@Entity("user")
@Index(["id"], { unique: true })
export class UserModel
	extends BaseModel
	implements UserModelInterface
{
	@PrimaryGeneratedColumn({ type: "bigint" })
	id: number | undefined;

	@Column({
		type: "varchar",
		length: 255
	})
	email!: string;

	@Column({
		type: "varchar",
		length: 50
	})
	first_name!: string;

	@Column({
		type: "varchar",
		length: 50,
        nullable: true,
        default: null
	})
	last_name!: string;

	@Column({
		type: "date"
	})
	dob!: string;

    @Column({
		type: "varchar",
		length: 50,
        nullable: true,
        default: null
	})
	timezone!: string;

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

	getEmail(): string {
        return this.email ?? "";
    }

    getFirstName(): string {
        return this.first_name ?? "";
    }

    getLastName(): string {
        return this.last_name ?? "";
    }

    getDateOfBirth(): string {
        return this.dob ?? "";
    }

    getTimezone(): string {
        return this.timezone ?? "";
    }

	/**
	 * MUTATOR
	 * =================================================================================================================
	 */
	fullName(): string {
		return this.getFirstName() + ' ' + this.getLastName();
	}
}
