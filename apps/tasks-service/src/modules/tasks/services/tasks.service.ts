import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {
	CreateTaskProps,
	RABBITMQ_CONFIG,
	RABBITMQ_EVENTS,
	TASK_ACTIONS,
} from "@repo/shared";
import { TaskHistoryRepository } from "../repositories/history.entity";
import { TaskTypeOrmRepository } from "../repositories/task.repository";

@Injectable()
export class TasksService {
	constructor(
		private taskRepository: TaskTypeOrmRepository,
		private taskHistoryRepository: TaskHistoryRepository,

		@Inject(RABBITMQ_CONFIG.TASKS_CLIENT_TOKEN)
		private readonly client: ClientProxy,
	) {}

	async create(createTaskProps: CreateTaskProps, userId: string) {
		const task = await this.taskRepository.save(createTaskProps);

		await this.taskHistoryRepository.save({
			action: TASK_ACTIONS.CREATED,
			changedBy: userId,
			taskId: task.id,
			newValue: task,
			oldValue: null,
		});

		this.client.emit(RABBITMQ_EVENTS.TASK_CREATED, {
			id: task.id,
			title: task.title,
			timestamp: new Date(),
		});
	}

	async delete(taskId: string, userId: string) {
		const task = await this.taskRepository.findById(taskId);

		if (!task) throw new NotFoundException("task not found");

		await this.taskRepository.delete(taskId);

		await this.taskHistoryRepository.save({
			action: TASK_ACTIONS.DELETED,
			changedBy: userId,
			taskId: task.id,
			oldValue: task,
			newValue: null,
		});
	}
}
