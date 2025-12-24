import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateTaskProps } from "@repo/shared";
import { TaskTypeOrmRepository } from "../repositories/task.repository";

@Injectable()
export class TasksService {
	constructor(
		private taskRepository: TaskTypeOrmRepository,
		@Inject("TASKS_BROKER") private readonly client: ClientProxy,
	) {}

	async create(props: CreateTaskProps) {
		const task = await this.taskRepository.save(props);
		console.log("Emitindo...");
		this.client.emit("task.created", {
			id: task.id,
			title: task.title,
			timestamp: new Date(),
		});
	}
}
