import { CreateTaskProps, TaskPriority, TaskStatus } from "@repo/shared";
import { Type } from "class-transformer";
import {
	IsArray,
	IsDate,
	IsEnum,
	IsOptional,
	IsString,
	IsUUID,
	MinLength,
} from "class-validator";

export class CreateTaskDto implements CreateTaskProps {
	@IsString()
	@MinLength(3)
	title!: string;

	@IsString()
	@MinLength(3)
	description!: string;

	@Type(() => Date)
	@IsDate()
	deadline!: Date;

	@IsOptional()
	@IsEnum(TaskPriority)
	priority!: TaskPriority;

	@IsOptional()
	@IsEnum(TaskStatus)
	status!: TaskStatus;

	@IsArray()
	@IsUUID("4", { each: true })
	@IsOptional()
	assignedUserIds?: string[];
}
