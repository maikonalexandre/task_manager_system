import { Injectable } from "@nestjs/common";
import { UserLoginProps, UserRegisterProps } from "@repo/shared";
import { UserTypeOrmRepository } from "src/infra/database/typeorm/repositories/user.reposirory";

@Injectable()
export class AuthService {
	constructor(private readonly usersRepository: UserTypeOrmRepository) {}

	register(registerProps: UserRegisterProps) {
		this.usersRepository.save({
			email: "teste@gmail.com",
			id: "id135",
			password: "password",
			username: "username",
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
