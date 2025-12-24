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
