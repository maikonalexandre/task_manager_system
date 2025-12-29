import { NotificationType } from "@repo/shared";
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("notifications")
export class NotificationEntity {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Index()
	@Column()
	userId!: string;

	@Column({
		type: "enum",
		enum: NotificationType,
	})
	type!: NotificationType;

	@Column("text")
	content!: string;

	@Column({ default: false })
	isRead?: boolean;

	@Column({ type: "jsonb", nullable: true })
	metadata?: { taskId: string };

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
