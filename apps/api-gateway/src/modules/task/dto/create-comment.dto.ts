import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateCommentDto {
	@ApiProperty({
		example: "Wow this looks so good, but there is a little mistake at line 3",
		description: "Content of the task's comment",
	})
	@IsString()
	@MinLength(3)
	content!: string;
}
