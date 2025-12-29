import { z } from "zod";

export enum NotificationType {
	TASK_CREATED = "TASK_CREATED",
	TASK_UPDATED = "TASK_UPDATED",
	NEW_COMMENT = "NEW_COMMENT",
}

export const notificationSchema = z.object({
	id: z.uuidv4().optional(),
	userId: z.uuidv4(),
	type: z.enum(NotificationType),
	content: z.string().min(3),
	isRead: z.boolean().default(false).optional(),
	metadata: z.object({ taskId: z.uuidv4() }).optional().nullable(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export type CreateNotificationProps = z.infer<typeof notificationSchema>;
