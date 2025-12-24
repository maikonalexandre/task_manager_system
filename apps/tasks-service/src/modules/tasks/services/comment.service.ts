import { Injectable } from "@nestjs/common";
import { CreateCommentProps } from "@repo/shared";
import { CommentsTypeOrmRepository } from "../repositories/comments.repository";

@Injectable()
export class CommentService {
	constructor(private commentRepository: CommentsTypeOrmRepository) {}
	async create(comment: CreateCommentProps) {
		await this.commentRepository.save(comment);
	}
}
