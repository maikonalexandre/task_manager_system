import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("tasks")
export class TaskEntity {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column()
	title!: string;

	@Column()
	description!: string;

	@Column()
	deadline!: Date;

	@Column()
	priority!: "LOW" | "MEDIUM" | "HIGH" | "URGENT";

	@Column()
	status!: "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
