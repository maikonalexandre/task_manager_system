import { IsString, IsUUID, MinLength } from "class-validator";

export class CreateCommentDto {
	@IsString()
	@MinLength(3)
	content!: string;

	@IsUUID("4")
	userId!: string;
}
