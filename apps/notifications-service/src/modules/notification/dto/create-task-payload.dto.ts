import { CreateTaskEventPayload, Task } from "@repo/shared";
import { IsJSON, IsUUID } from "class-validator";

export class CreateTaskPayloadDto implements CreateTaskEventPayload {
	@IsJSON()
	task!: Task;

	@IsUUID("4")
	taskId!: string;
}
