import { Injectable } from "@nestjs/common";
import { CreateTaskProps } from "@repo/shared";
import { TaskTypeOrmRepository } from "../../infra/database/typeorm/repositories/task.reposirory";

@Injectable()
export class TasksService {
	constructor(private taskRepository: TaskTypeOrmRepository) {}
	async create(task: CreateTaskProps) {
		await this.taskRepository.save(task);
	}
}
