import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
	CreateTaskProps,
	PaginationQueryProps,
	Task,
	UpdateTaskProps,
} from "@repo/shared";
import { Repository } from "typeorm";
import { TaskEntity } from "../entities/task.entity";

interface FindAndCountProps extends PaginationQueryProps {
	order: "DESC" | "ASC";
}

@Injectable()
export class TaskTypeOrmRepository {
	constructor(
		@InjectRepository(TaskEntity)
		private readonly repo: Repository<TaskEntity>,
	) {}

	async save(task: CreateTaskProps) {
		return await this.repo.save(task);
	}

	async delete(taskId: string) {
		return await this.repo.delete({ id: taskId });
	}

	async findById(id: string) {
		return await this.repo.findOneBy({ id });
	}

	async update(id: string, data: UpdateTaskProps) {
		await this.repo.update(id, data);
		const task = await this.repo.findOneBy({ id });
		return task as Task;
	}

	async findAndCount({ order, page, size }: FindAndCountProps) {
		const [tasks, count] = await this.repo.findAndCount({
			take: size,
			order: { createdAt: order },
			skip: (page - 1) * size,
		});

		return { tasks, count };
	}
}
