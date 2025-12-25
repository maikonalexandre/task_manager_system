import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UserId } from "src/common/get-user-id.decorator";
import { CreateTaskDto } from "../dto/create-task.dto";
import { TasksService } from "../services/tasks.service";

@Controller("tasks")
export class TasksController {
	constructor(private readonly task: TasksService) {}

	@Post()
	async create(@Body() task: CreateTaskDto, @UserId() userId: string) {
		await this.task.create(task, userId);
	}

	@Get("/:id")
	async getTask() {
		throw new Error("Method not implemented");
	}

	@Delete(":id/delete")
	async delete(@Param("id") taskId: string, @UserId() userId: string) {
		await this.task.delete(taskId, userId);
	}
}
