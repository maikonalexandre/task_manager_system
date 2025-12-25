import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiOperation,
} from "@nestjs/swagger";
import { GetCurrentUserId } from "src/common/current-user-decorator";
import { JwtVerifyGuard } from "src/common/jwt.guard";
import { CreateTaskDto } from "../dto/create-task.dto";
import { TasksService } from "../services/task.service";

@Controller("/tasks")
export class TasksController {
	constructor(private readonly task: TasksService) {}

	@Post("")
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
}
