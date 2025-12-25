import { ApiProperty } from "@nestjs/swagger";
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
	@ApiProperty({
		example: "Setup ci environment",
		description: "Task's title",
	})
	@IsString()
	@MinLength(3)
	title!: string;

	@ApiProperty({
		example: "Setup ci environment to deploy app at digital ocean kubernetis",
		description: "Task's description",
	})
	@IsString()
	@MinLength(3)
	description!: string;

	@ApiProperty({
		example: "08/01/2026",
		description: "Task's deadline",
	})
	@Type(() => Date)
	@IsDate()
	deadline!: Date;

	@ApiProperty({
		example: "HIGH",
		description: "Task's priority",
	})
	@IsOptional()
	@IsEnum(TaskPriority)
	priority!: TaskPriority;

	@ApiProperty({
		example: "DONE",
		description: "Task's status",
	})
	@IsOptional()
	@IsEnum(TaskStatus)
	status!: TaskStatus;

	@ApiProperty({
		example: [
			"7420e505-6f8e-40af-8e7e-6c31e70da23c",
			"def62228-2bc7-497a-8af5-ac510af454e7",
		],
		description: "User's ids (uuid) array assigned to the task",
	})
	@IsArray()
	@IsUUID("4", { each: true })
	@IsOptional()
	assignedUserIds?: string[];
}
