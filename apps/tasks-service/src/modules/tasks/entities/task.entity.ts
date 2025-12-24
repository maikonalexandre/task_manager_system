import { TaskPriority, TaskStatus } from "@repo/shared";
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

	@Column({
		type: "enum",
		enum: TaskPriority,
		default: TaskPriority.LOW,
	})
	priority!: TaskPriority;

	@Column({
		type: "enum",
		enum: TaskStatus,
		default: TaskStatus.TODO,
	})
	status!: TaskStatus;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
