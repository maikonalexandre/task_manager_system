import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Query,
	UseGuards,
} from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from "@nestjs/swagger";
import { GetCurrentUserId } from "src/common/current-user-decorator";
import { JwtVerifyGuard } from "src/common/jwt.guard";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { PaginationQueryDto } from "../dto/pagination-query.dto";
import { CommentService } from "../services/comment.service";

@Controller("tasks")
export class CommentController {
	constructor(private readonly comment: CommentService) {}

	@Post(":id/comments")
	@UseGuards(JwtVerifyGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: "Add a comment to a task" })
	@ApiOkResponse({ description: "Commente created" })
	@ApiNotFoundResponse({ description: "Task not found" })
	@ApiBadRequestResponse({ description: "Invalid comment's data" })
	async addComment(
		@Param("id") taskId: string,
		@Body() createCommentDto: CreateCommentDto,
		@GetCurrentUserId() userId: string,
	) {
		console.log("Bateu aqui");
		return await this.comment.create(taskId, userId, createCommentDto);
	}

	@Get(":id/comments")
	@UseGuards(JwtVerifyGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: "List all task's comments" })
	@ApiOkResponse({ description: "List of all task's comments and metadata" })
	@ApiNotFoundResponse({ description: "Task not found" })
	async findAll(
		@Param("id") taskId: string,
		@GetCurrentUserId() userId: string,
		@Query() paginationQuery: PaginationQueryDto,
	) {
		return this.comment.findAll(paginationQuery, taskId, userId);
	}
}
