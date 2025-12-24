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
	priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
	status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "DONE"]),
});

export type CreateTaskProps = z.infer<typeof createTaskSchema>;
