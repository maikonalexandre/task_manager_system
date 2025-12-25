import { z } from "zod";

export enum TaskPriority {
	LOW = "LOW",
	MEDIUM = "MEDIUM",
	HIGH = "HIGH",
	URGENT = "URGENT",
}

export enum TaskStatus {
	TODO = "TODO",
	IN_PROGRESS = "IN_PROGRESS",
	REVIEW = "REVIEW",
	DONE = "DONE",
}

export const createTaskSchema = z.object({
	title: z.string().min(3),
	description: z.string(),
	deadline: z.date(),
	priority: z.enum(TaskPriority),
	status: z.enum(TaskStatus),
	assignedUserIds: z.uuidv4().array().optional(),
});

export type CreateTaskProps = z.infer<typeof createTaskSchema>;

export enum TASK_ACTIONS {
	CREATED = "TASK_CREATED",
	UPDATED = "TASK_UPDATED",
	STATUS_CHANGED = "STATUS_CHANGED",
	ASSIGNEE_ADDED = "ASSIGNEE_ADDED",
	COMMENT_ADDED = "COMMENT_ADDED",
	DELETED = "TASK_DELETED",
}

export const createTaskHistorySchema = z.object({
	taskId: z.uuidv4(),
	changedBy: z.uuidv4(),
	action: z.enum(TASK_ACTIONS),
	oldValue: z.any().optional(),
	newValue: z.any().optional(),
});

export type CreateTaskHistoryProps = z.infer<typeof createTaskHistorySchema>;
