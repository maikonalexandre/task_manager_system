import { CreateCommentProps } from "@repo/shared";
import { IsString, MinLength } from "class-validator";

export class CreateCommentDto implements CreateCommentProps {
	@IsString()
	@MinLength(3)
	content!: string;
}
