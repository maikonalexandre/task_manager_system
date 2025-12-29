import { Task, UpdateTaskEventPayload } from "@repo/shared";
import { IsJSON, IsUUID } from "class-validator";

export class UpdateTaskPayloadDto implements UpdateTaskEventPayload {
	@IsJSON()
	oldTaskSnapshot!: Task;

	@IsJSON()
	newTaskSnapshot!: Task;

	@IsUUID("4")
	taskId!: string;
}
