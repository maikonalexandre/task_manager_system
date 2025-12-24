import { CreateTaskProps } from "@repo/shared";
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

	@IsEnum(["LOW", "MEDIUM", "HIGH", "URGENT"])
	priority!: "LOW" | "MEDIUM" | "HIGH" | "URGENT";

	@IsEnum(["TODO", "IN_PROGRESS", "REVIEW", "DONE"])
	status!: "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";
}
