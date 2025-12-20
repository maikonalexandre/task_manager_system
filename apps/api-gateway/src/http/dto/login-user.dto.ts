import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
	@ApiProperty({
		example: 'joao_silva@email.dev',
		description: 'O email único de usuário',
	})
	@IsEmail({})
	email!: string;

	@ApiProperty({
		example: 'joao14dev',
		description: 'A senha do usuário',
	})
	@IsString()
	@MinLength(6)
	@MaxLength(16)
	password!: string;
}
