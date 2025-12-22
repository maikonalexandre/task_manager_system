import { ConflictException, Injectable } from "@nestjs/common";
import { UserLoginProps, UserRegisterProps } from "@repo/shared";
import { hash } from "bcryptjs";
import { UserTypeOrmRepository } from "src/infra/database/typeorm/repositories/user.reposirory";

@Injectable()
export class AuthService {
	constructor(private readonly usersRepository: UserTypeOrmRepository) {}

	async register(registerProps: UserRegisterProps) {
		const { email, password, username } = registerProps;

		const userWithSameEmail = await this.usersRepository.findByEmail(
			registerProps.email,
		);

		if (userWithSameEmail)
			throw new ConflictException("user with same email already exists");

		const hashedPassword = await hash(password, 8);

		await this.usersRepository.save({
			email,
			username,
			password: hashedPassword,
		});
	}

	login(loginProps: UserLoginProps) {
		console.log("user", loginProps);
		return "OK";
	}

	refresh() {
		return "OK";
	}
}
