import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {
	CreateTaskProps,
	PaginationQueryProps,
	RABBITMQ_CONFIG,
	RABBITMQ_EVENTS,
	TASK_ACTIONS,
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

		this.client.emit(RABBITMQ_EVENTS.TASK_CREATED, {
			id: task.id,
			title: task.title,
			timestamp: new Date(),
		});

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
				totalItems: count,
				itemCount: tasks.length,
				itemsPerPage: size,
				totalPages: Math.ceil(count / size),
				currentPage: page,
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

		this.client.emit(RABBITMQ_EVENTS.TASK_UPDATED, {
			id: task.id,
			title: task.title,
			timestamp: new Date(),
		});

		return updatedTask;
	}
}
