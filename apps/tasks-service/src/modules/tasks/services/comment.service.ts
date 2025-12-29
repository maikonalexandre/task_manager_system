import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {
	CreateCommentEventPayload,
	CreateCommentProps,
	PaginationQueryProps,
	RABBITMQ_CONFIG,
	RABBITMQ_EVENTS,
	TASK_ACTIONS,
} from "@repo/shared";
import { CommentsTypeOrmRepository } from "../repositories/comments.repository";
import { TaskHistoryTypeOrmRepository } from "../repositories/history.entity";
import { TaskTypeOrmRepository } from "../repositories/task.repository";

@Injectable()
export class CommentService {
	constructor(
		private commentRepository: CommentsTypeOrmRepository,
		private taskRepository: TaskTypeOrmRepository,
		private taskHistoryRepository: TaskHistoryTypeOrmRepository,

		@Inject(RABBITMQ_CONFIG.TASKS_CLIENT_TOKEN)
		private readonly client: ClientProxy,
	) {}
	async create(taskId: string, userId: string, comment: CreateCommentProps) {
		const task = await this.taskRepository.findById(taskId);
		if (!task) throw new NotFoundException("task not found");

		const newComment = await this.commentRepository.save(
			taskId,
			userId,
			comment,
		);

		await this.taskHistoryRepository.save({
			taskId,
			action: TASK_ACTIONS.COMMENT_ADDED,
			changedBy: userId,
			newValue: newComment,
			oldValue: null,
		});

		this.client.emit<string, CreateCommentEventPayload>(
			RABBITMQ_EVENTS.COMMENT_CREATED,
			{
				taskId: task.id,
				task: task,
				content: newComment.content,
			},
		);

		return newComment;
	}

	async findAll(paginationQuery: PaginationQueryProps, taskId: string) {
		const task = await this.taskRepository.findById(taskId);
		if (!task) throw new NotFoundException("task not found");

		const { page, size } = paginationQuery;

		const { count, comments } =
			await this.commentRepository.findAndCountByTaskId({
				page,
				size,
				order: "DESC",
				taskId,
			});

		return {
			comments,
			meta: {
				total_items: count,
				item_count: comments.length,
				items_per_page: size,
				total_pages: Math.ceil(count / size),
				current_page: page,
			},
		};
	}
}
