import { ApiProperty } from "@nestjs/swagger";
import { UserRegisterInterface } from "@repo/shared";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto implements UserRegisterInterface {
	@ApiProperty({
		example: "joao_silva",
		description: "User's username",
	})
	@IsString()
	@MinLength(3)
	username!: string;

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
