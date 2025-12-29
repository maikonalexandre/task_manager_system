import { z } from "zod";
import { mapEnumToOptions } from "../utils/index";

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

export enum TASK_ACTIONS {
	CREATED = "TASK_CREATED",
	UPDATED = "TASK_UPDATED",
	STATUS_CHANGED = "STATUS_CHANGED",
	ASSIGNEE_ADDED = "ASSIGNEE_ADDED",
	COMMENT_ADDED = "COMMENT_ADDED",
	DELETED = "TASK_DELETED",
}

export const taskPriorityOptions = mapEnumToOptions(TaskPriority);
export const taskStatusOptions = mapEnumToOptions(TaskStatus);

export const createTaskSchema = z.object({
	title: z
		.string()
		.min(3, { message: "Titulo precisa ter pelo menos 3 digitos!" }),
	description: z
		.string()
		.min(3, { message: "Descrição precisa ter pelo menos 3 digitos!" }),
	deadline: z.coerce.date("Selecione o prazo para task!"),
	priority: z.enum(TaskPriority, { error: "Selecione uma prioridade!" }),
	status: z.enum(TaskStatus, { error: "Selecioner um status!" }),
	assignedUserIds: z.uuidv4().array().optional(),
});

export const createTaskHistorySchema = z.object({
	taskId: z.uuidv4(),
	changedBy: z.uuidv4(),
	action: z.enum(TASK_ACTIONS),
	oldValue: z.any().optional(),
	newValue: z.any().optional(),
});

export const taskSchema = createTaskSchema.extend({
	id: z.uuidv4(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const updateTaskSchema = createTaskSchema.partial();

export type CreateTaskProps = z.infer<typeof createTaskSchema>;
export type UpdateTaskProps = z.infer<typeof updateTaskSchema>;
export type Task = z.infer<typeof taskSchema>;

export type CreateTaskHistoryProps = z.infer<typeof createTaskHistorySchema>;
