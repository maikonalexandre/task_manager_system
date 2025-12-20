import { UserRegisterProps } from "@repo/shared";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto implements UserRegisterProps {
	@IsString()
	@MinLength(3)
	username!: string;

	@IsEmail({})
	email!: string;

	@IsString()
	@MinLength(6)
	@MaxLength(16)
	password!: string;
}
