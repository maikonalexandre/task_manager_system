import { TaskPriority, TaskStatus } from "@repo/shared";
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { CommentEntity } from "./comments.entity";

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
	priority?: TaskPriority;

	@Column({
		type: "enum",
		enum: TaskStatus,
		default: TaskStatus.TODO,
	})
	status?: TaskStatus;

	@Column("uuid", { array: true, default: "{}" })
	assignedUserIds!: string[];

	@OneToMany(
		() => CommentEntity,
		(comment) => comment.task,
	)
	comments?: CommentEntity[];

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
