import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "../../../../domain/entities/task.entity";
import { TasksRepository } from "../../../../domain/repositories/task.repository";
import { TaskEntity } from "../entities/task.entity";

@Injectable()
export class TaskTypeOrmRepository implements TasksRepository {
	constructor(
		@InjectRepository(TaskEntity)
		private readonly repo: Repository<TaskEntity>,
	) {}

	async save(task: Omit<Task, "id">) {
		await this.repo.save({
			title: task.title,
			description: task.description,
			priority: task.priority,
			deadline: task.deadline,
			status: task.status,
		});
	}
}
