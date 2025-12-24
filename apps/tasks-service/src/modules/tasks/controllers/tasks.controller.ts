import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateTaskDto } from "../dto/create-task.dto";
import { TasksService } from "../services/tasks.service";

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
