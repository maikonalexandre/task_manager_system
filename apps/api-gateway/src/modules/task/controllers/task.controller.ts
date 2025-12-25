import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UseGuards,
} from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from "@nestjs/swagger";
import { GetCurrentUserId } from "src/common/current-user-decorator";
import { JwtVerifyGuard } from "src/common/jwt.guard";
import { CreateTaskDto } from "../dto/create-task.dto";
import { PaginationQueryDto } from "../dto/pagination-query.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { TasksService } from "../services/task.service";

@Controller("tasks")
export class TasksController {
	constructor(private readonly task: TasksService) {}

	@Post()
	@UseGuards(JwtVerifyGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: "Create a new task" })
	@ApiCreatedResponse({ description: "Task created" })
	@ApiBadRequestResponse({ description: "Invalid task's data" })
	create(
		@Body() createTaskDto: CreateTaskDto,
		@GetCurrentUserId() userId: string,
	) {
		return this.task.create(createTaskDto, userId);
	}

	@Get()
	@UseGuards(JwtVerifyGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: "List tasks with pagination" })
	@ApiOkResponse({ description: "List with tasks and metadata" })
	async findAll(
		@Query() paginationQuery: PaginationQueryDto,
		@GetCurrentUserId() userId: string,
	) {
		return this.task.findAll(paginationQuery, userId);
	}

	@Get(":id")
	@UseGuards(JwtVerifyGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: "Get a task by id" })
	@ApiOkResponse({ description: "Task founded" })
	@ApiNotFoundResponse({ description: "Task not found" })
	@ApiBadRequestResponse({ description: "Invalid task's id" })
	get(@Param("id") taskId: string, @GetCurrentUserId() userId: string) {
		return this.task.get(taskId, userId);
	}

	@Delete(":id")
	@UseGuards(JwtVerifyGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: "Delete a task" })
	@ApiOkResponse({ description: "Task deleted" })
	@ApiNotFoundResponse({ description: "Task not found" })
	@ApiBadRequestResponse({ description: "Invalid task's id" })
	delete(@Param("id") taskId: string, @GetCurrentUserId() userId: string) {
		return this.task.delete(taskId, userId);
	}

	@Put(":id")
	@UseGuards(JwtVerifyGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: "Update a task by id" })
	@ApiOkResponse({ description: "Task updated" })
	@ApiNotFoundResponse({ description: "Task not found" })
	@ApiBadRequestResponse({ description: "Invalid task's id" })
	async update(
		@Param("id") id: string,
		@GetCurrentUserId() userId: string,
		@Body() updateTaskDto: UpdateTaskDto,
	) {
		return this.task.update(id, userId, updateTaskDto);
	}
}
