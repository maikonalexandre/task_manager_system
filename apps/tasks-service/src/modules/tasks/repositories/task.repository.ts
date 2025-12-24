import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskProps } from "@repo/shared";
import { Repository } from "typeorm";
import { TaskEntity } from "../entities/task.entity";

@Injectable()
export class TaskTypeOrmRepository {
	constructor(
		@InjectRepository(TaskEntity)
		private readonly repo: Repository<TaskEntity>,
	) {}

	async save(task: CreateTaskProps) {
		await this.repo.save({
			title: task.title,
			description: task.description,
			priority: task.priority,
			deadline: task.deadline,
			status: task.status,
		});
	}
}
