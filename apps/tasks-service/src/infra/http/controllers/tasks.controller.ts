import { Body, Controller, Get, Post } from "@nestjs/common";
import { TasksService } from "../../../domain/services/tasks.service";
import { CreateTaskDto } from "../dto/create-task.dto";

@Controller("tasks")
export class TasksController {
	constructor(private readonly task: TasksService) {}

	@Post()
	async create(@Body() task: CreateTaskDto) {
		await this.task.create(task);
	}

	@Get("/:id")
	async getTask() {
		throw new Error("Method not implemented");
	}
}
