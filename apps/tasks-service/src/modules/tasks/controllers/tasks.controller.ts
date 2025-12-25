import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from "@nestjs/common";
import { UserId } from "src/common/get-user-id.decorator";
import { CreateTaskDto } from "../dto/create-task.dto";
import { PaginationQueryDto } from "../dto/pagination-query.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { TasksService } from "../services/tasks.service";

@Controller("tasks")
export class TasksController {
	constructor(private readonly task: TasksService) {}

	@Post()
	async create(@Body() task: CreateTaskDto, @UserId() userId: string) {
		return await this.task.create(task, userId);
	}

	@Get()
	async findAll(@Query() paginationQuery: PaginationQueryDto) {
		return this.task.findAll(paginationQuery);
	}

	@Get(":id")
	async getTask(@Param("id") taskId: string) {
		return await this.task.get(taskId);
	}

	@Delete(":id")
	async delete(@Param("id") taskId: string, @UserId() userId: string) {
		return await this.task.delete(taskId, userId);
	}

	@Put(":id")
	async update(
		@Param("id") id: string,
		@UserId() userId: string,
		@Body() updateTaskDto: UpdateTaskDto,
	) {
		return this.task.update(id, userId, updateTaskDto);
	}
}
