import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { UserId } from "src/common/get-user-id.decorator";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { PaginationQueryDto } from "../dto/pagination-query.dto";
import { CommentService } from "../services/comment.service";

@Controller("tasks")
export class CommentController {
	constructor(private readonly comment: CommentService) {}

	@Post(":id/comments")
	async addComment(
		@Param("id") taskId: string,
		@Body() createCommentDto: CreateCommentDto,
		@UserId() userId: string,
	) {
		return await this.comment.create(taskId, userId, createCommentDto);
	}

	@Get(":id/comments")
	async findAll(
		@Param("id") taskId: string,
		@Query() paginationQuery: PaginationQueryDto,
	) {
		return this.comment.findAll(paginationQuery, taskId);
	}
}
