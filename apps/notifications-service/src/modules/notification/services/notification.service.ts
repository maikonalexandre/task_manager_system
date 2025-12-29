import { forwardRef, Inject, Injectable } from "@nestjs/common";
import {
	CreateCommentEventPayload,
	NotificationType,
	WS_EVENTS,
} from "@repo/shared";
import { NotificationGateway } from "../gateway/notification.gateway";
import { NotificationTypeOrmRepository } from "../repositories/notification.repository";

@Injectable()
export class NotificationService {
	constructor(
		private notificationRepository: NotificationTypeOrmRepository,
		@Inject(forwardRef(() => NotificationGateway))
		private readonly notificationGateway: NotificationGateway,
	) {}

	async commentCreated(payload: CreateCommentEventPayload) {
		if (payload.task.assignedUserIds) {
			for (const user of payload.task.assignedUserIds) {
				const notification = await this.notificationRepository.save({
					content:
						"Um comentário foi adicionado a uma task que você é responsável!",
					type: NotificationType.NEW_COMMENT,
					userId: user,
					metadata: { taskId: payload.taskId },
				});

				this.notificationGateway.sendNotificationToUser({
					userId: user,
					event: WS_EVENTS.COMMENT_CREATED,
					payload: {
						message: notification.content,
						taskId: notification.metadata.taskId,
					},
				});
			}
		}
	}
}
