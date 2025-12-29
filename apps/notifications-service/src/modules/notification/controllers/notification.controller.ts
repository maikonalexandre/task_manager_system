import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { RABBITMQ_EVENTS } from "@repo/shared";
import { CreateCommentPayloadDto } from "../dto/create-comment-payload.dto";
import { NotificationService } from "../services/notification.service";

@Controller()
export class NotificationsController {
	constructor(private readonly notificationService: NotificationService) {}

	@EventPattern(RABBITMQ_EVENTS.TASK_CREATED)
	async handleTaskCreated() {
		console.log("OPA TASK CRIADA - [TASK.CREATED]");
		// sempre notifico usuários criados
	}

	@EventPattern(RABBITMQ_EVENTS.TASK_UPDATED)
	async handleTaskUpdated() {
		// buscar difereça entre usuarios criados e
	}

	@EventPattern(RABBITMQ_EVENTS.COMMENT_CREATED)
	async handleCommentCreated(@Payload() payload: CreateCommentPayloadDto) {
		this.notificationService.commentCreated({
			task: payload.task,
			taskId: payload.taskId,
			content: payload.content,
		});
	}
}
