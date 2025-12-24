import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { TaskEntity } from "./task.entity";

@Entity("comments")
export class CommentEntity {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column("text")
	content!: string;

	@Column("uuid")
	userId!: string;

	@Column("uuid")
	taskId!: string;

	@ManyToOne(
		() => TaskEntity,
		(task) => task.comments,
		{ onDelete: "CASCADE" },
	)

	@JoinColumn({ name: "taskId" })
	task!: TaskEntity;

	@CreateDateColumn()
	createdAt?: Date;
}
