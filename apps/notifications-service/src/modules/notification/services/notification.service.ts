import { forwardRef, Inject, Injectable } from "@nestjs/common";
import {
	CreateCommentEventPayload,
	CreateTaskEventPayload,
	NotificationType,
	UpdateTaskEventPayload,
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

	async taskCreated(payload: CreateTaskEventPayload) {
		if (payload.task.assignedUserIds) {
			for (const user of payload.task.assignedUserIds) {
				const notification = await this.notificationRepository.save({
					content: "Você foi adicionado como responsavel por uma task!",
					type: NotificationType.TASK_CREATED,
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

	async updatedTask(payload: UpdateTaskEventPayload) {
		console.log("BEING CALLED", payload.newTaskSnapshot.assignedUserIds);

		if (payload.oldTaskSnapshot.status !== payload.newTaskSnapshot.status) {
			if (payload.newTaskSnapshot.assignedUserIds) {
				for (const user of payload.newTaskSnapshot.assignedUserIds) {
					const notification = await this.notificationRepository.save({
						content:
							"O status de uma task no qual você é responsavel foi alterado!",
						type: NotificationType.TASK_CREATED,
						userId: user,
						metadata: { taskId: payload.taskId },
					});

					this.notificationGateway.sendNotificationToUser({
						userId: user,
						event: WS_EVENTS.TASK_UPDATED,
						payload: {
							message: notification.content,
							taskId: notification.metadata.taskId,
						},
					});
				}
			}
		}

		const oldAssignedUsers = payload.oldTaskSnapshot.assignedUserIds || [];
		const newAssignedUsers = payload.newTaskSnapshot.assignedUserIds || [];

		const addedUsers = newAssignedUsers.filter(
			(userId) => !oldAssignedUsers.includes(userId),
		);

		for (const user of addedUsers) {
			const notification = await this.notificationRepository.save({
				content: "Você foi adicionado como responsavel por uma task!",
				type: NotificationType.TASK_CREATED,
				userId: user,
				metadata: { taskId: payload.taskId },
			});

			this.notificationGateway.sendNotificationToUser({
				userId: user,
				event: WS_EVENTS.TASK_UPDATED,
				payload: {
					message: notification.content,
					taskId: notification.metadata.taskId,
				},
			});
		}
	}
}
