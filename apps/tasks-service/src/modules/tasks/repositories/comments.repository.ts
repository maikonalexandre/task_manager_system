import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCommentProps } from "@repo/shared";
import { Repository } from "typeorm";
import { CommentEntity } from "../entities/comments.entity";

@Injectable()
export class CommentsTypeOrmRepository {
	constructor(
		@InjectRepository(CommentEntity)
		private readonly repo: Repository<CommentEntity>,
	) {}

	async save(comment: CreateCommentProps) {
		await this.repo.save(comment);
	}
}
