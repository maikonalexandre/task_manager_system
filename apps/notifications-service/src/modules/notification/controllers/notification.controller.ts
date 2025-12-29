import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { RABBITMQ_EVENTS } from "@repo/shared";
import { CreateCommentPayloadDto } from "../dto/create-comment-payload.dto";
import { UpdateTaskPayloadDto } from "../dto/update-task-payload.dto";
import { NotificationService } from "../services/notification.service";

@Controller()
export class NotificationsController {
	constructor(private readonly notificationService: NotificationService) {}

	@EventPattern(RABBITMQ_EVENTS.TASK_CREATED)
	async handleTaskCreated(@Payload() payload: CreateCommentPayloadDto) {
		this.notificationService.commentCreated(payload);
	}

	@EventPattern(RABBITMQ_EVENTS.TASK_UPDATED)
	async handleTaskUpdated(@Payload() payload: UpdateTaskPayloadDto) {
		this.notificationService.updatedTask(payload);
	}

	@EventPattern(RABBITMQ_EVENTS.COMMENT_CREATED)
	async handleCommentCreated(@Payload() payload: CreateCommentPayloadDto) {
		this.notificationService.commentCreated(payload);
	}
}
