import { TASK_ACTIONS } from "@repo/shared";
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity("task_history")
export class TaskHistoryEntity {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column()
	taskId!: string;

	@Column("uuid")
	changedBy!: string;

	@Column({ type: "enum", enum: TASK_ACTIONS })
	action!: TASK_ACTIONS;

	@Column({ type: "jsonb", nullable: true })
	oldValue?: unknown;

	@Column({ type: "jsonb", nullable: true })
	newValue?: unknown;

	@CreateDateColumn()
	createdAt!: Date;
}
