import { UserLoginProps } from "@repo/shared";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDto implements UserLoginProps {
	@IsEmail({})
	email!: string;

	@IsString()
	@MinLength(6)
	@MaxLength(16)
	password!: string;
}
