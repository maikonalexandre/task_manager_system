export const RABBITMQ_CONFIG = {
	TASKS_CLIENT_TOKEN: "TASKS_BROKER",
	TASKS_QUEUE: "tasks_queue",
	NOTIFICATIONS_QUEUE: "notifications_queue",
} as const;

export const RABBITMQ_EVENTS = {
	TASK_CREATED: "task.created",
	TASK_UPDATED: "task.updated",
};
