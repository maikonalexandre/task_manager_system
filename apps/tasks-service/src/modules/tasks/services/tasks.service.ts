import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {
	CreateTaskEventPayload,
	CreateTaskProps,
	PaginationQueryProps,
	RABBITMQ_CONFIG,
	RABBITMQ_EVENTS,
	TASK_ACTIONS,
	Task,
	UpdateTaskEventPayload,
	UpdateTaskProps,
} from "@repo/shared";
import { TaskHistoryTypeOrmRepository } from "../repositories/history.entity";
import { TaskTypeOrmRepository } from "../repositories/task.repository";

@Injectable()
export class TasksService {
	constructor(
		private taskRepository: TaskTypeOrmRepository,
		private taskHistoryRepository: TaskHistoryTypeOrmRepository,

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

		this.client.emit<string, CreateTaskEventPayload>(
			RABBITMQ_EVENTS.TASK_CREATED,
			{ task, taskId: task.id },
		);

		return task;
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

	async get(taskId: string) {
		const task = await this.taskRepository.findById(taskId);
		if (!task) throw new NotFoundException("task not found");
		return task;
	}

	async findAll(paginationQuery: PaginationQueryProps) {
		const { page, size } = paginationQuery;

		const { count, tasks } = await this.taskRepository.findAndCount({
			page,
			size,
			order: "DESC",
		});

		return {
			tasks,
			meta: {
				total_items: count,
				item_count: tasks.length,
				items_per_page: size,
				total_pages: Math.ceil(count / size),
				current_page: page,
			},
		};
	}

	async update(
		taskId: string,
		userId: string,
		updateTaskProps: UpdateTaskProps,
	) {
		const task = await this.taskRepository.findById(taskId);
		if (!task) throw new NotFoundException("Tarefa não encontrada");

		const updatedTask = await this.taskRepository.update(
			taskId,
			updateTaskProps,
		);

		await this.taskHistoryRepository.save({
			action: TASK_ACTIONS.CREATED,
			changedBy: userId,
			taskId: task.id,
			newValue: updatedTask,
			oldValue: task,
		});

		this.client.emit<string, UpdateTaskEventPayload>(
			RABBITMQ_EVENTS.TASK_UPDATED,
			{
				oldTaskSnapshot: task,
				newTaskSnapshot: updatedTask,
				taskId: task.id,
			},
		);

		return updatedTask;
	}
}
