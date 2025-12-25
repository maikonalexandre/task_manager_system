import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCommentProps, PaginationQueryProps } from "@repo/shared";
import { Repository } from "typeorm";
import { CommentEntity } from "../entities/comments.entity";

interface FindAndCountProps extends PaginationQueryProps {
	order: "DESC" | "ASC";
	taskId: string;
}

@Injectable()
export class CommentsTypeOrmRepository {
	constructor(
		@InjectRepository(CommentEntity)
		private readonly repo: Repository<CommentEntity>,
	) {}

	async save(taskId: string, userId: string, { content }: CreateCommentProps) {
		return await this.repo.save({
			content,
			taskId,
			userId,
		});
	}

	async findAndCountByTaskId({ order, page, size, taskId }: FindAndCountProps) {
		const [comments, count] = await this.repo.findAndCount({
			where: { taskId },
			take: size,
			order: { createdAt: order },
			skip: (page - 1) * size,
		});

		return { comments, count };
	}
}
