import { CreateCommentEventPayload, Task } from "@repo/shared";
import { IsJSON, IsString, IsUUID, MinLength } from "class-validator";

export class CreateCommentPayloadDto implements CreateCommentEventPayload {
	@IsJSON()
	task!: Task;

	@IsString()
	@MinLength(3)
	content!: string;

	@IsUUID("4")
	taskId!: string;
}
