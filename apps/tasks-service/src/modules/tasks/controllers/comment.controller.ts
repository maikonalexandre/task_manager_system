import { Body, Controller, Param, Post } from "@nestjs/common";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { CommentService } from "../services/comment.service";

@Controller("tasks")
export class CommentController {
	constructor(private readonly comment: CommentService) {}

	@Post(":id/comments")
	async addComment(
		@Param("id") taskId: string,
		@Body() body: CreateCommentDto,
	) {
		await this.comment.create({ taskId, ...body });
	}
}
