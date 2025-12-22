import {
	ConflictException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { UserLoginProps, UserRegisterProps } from "@repo/shared";
import { compare, hash } from "bcryptjs";
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

	async login(loginProps: UserLoginProps) {
		const { email, password } = loginProps;
		const user = await this.usersRepository.findByEmail(email);

		if (!user) throw new UnauthorizedException("user not found");

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) throw new UnauthorizedException("invalid credentials");

		return { id: user.id };
	}

	refresh() {
		return "OK";
	}
}
