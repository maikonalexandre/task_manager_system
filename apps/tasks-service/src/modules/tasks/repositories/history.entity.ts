import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskHistoryProps } from "@repo/shared";
import { Repository } from "typeorm";
import { TaskHistoryEntity } from "../entities/history.entity";

@Injectable()
export class TaskHistoryRepository {
	constructor(
		@InjectRepository(TaskHistoryEntity)
		private readonly repo: Repository<TaskHistoryEntity>,
	) {}

	async save(taskHistory: CreateTaskHistoryProps) {
		return await this.repo.save(taskHistory);
	}
}
