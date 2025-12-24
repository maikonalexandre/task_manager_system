import { Injectable } from "@nestjs/common";
import { CreateTaskProps } from "@repo/shared";
import { TaskTypeOrmRepository } from "../repositories/task.repository";

@Injectable()
export class TasksService {
	constructor(private taskRepository: TaskTypeOrmRepository) {}
	async create(task: CreateTaskProps) {
		await this.taskRepository.save(task);
	}
}
