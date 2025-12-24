import { CreateTaskProps, TaskPriority, TaskStatus } from "@repo/shared";
import { IsDate, IsEnum, IsString, MinLength } from "class-validator";

export class CreateTaskDto implements CreateTaskProps {
	@IsString()
	@MinLength(3)
	title!: string;

	@IsString()
	@MinLength(3)
	description!: string;

	@IsDate()
	deadline!: Date;

	@IsEnum(TaskPriority)
	priority!: TaskPriority;

	@IsEnum(TaskStatus)
	status!: TaskStatus;
}
