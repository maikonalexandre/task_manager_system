import { ApiProperty } from "@nestjs/swagger";
import { UserLoginProps } from "@repo/shared";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDto implements UserLoginProps {
	@ApiProperty({
		example: "joao_silva@email.dev",
		description: "User's email",
	})
	@IsEmail({})
	email!: string;

	@ApiProperty({
		example: "joao14dev",
		description: "User's password",
	})
	@IsString()
	@MinLength(6)
	@MaxLength(16)
	password!: string;
}
