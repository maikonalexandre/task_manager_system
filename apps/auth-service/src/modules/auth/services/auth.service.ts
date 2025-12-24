import {
	ConflictException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";

import { UserLoginProps, UserRegisterProps } from "@repo/shared";
import { compare, hash } from "bcryptjs";
import { JwtService } from "../../../common/jwt.service";
import { UserTypeOrmRepository } from "../repositories/user.repository";

@Injectable()
export class AuthService {
	constructor(
		private usersRepository: UserTypeOrmRepository,
		private jwtAuthService: JwtService,
	) {}

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

		const token = this.jwtAuthService.createAccessToken({
			sub: user.id,
			email: user.email,
			username: user.username,
		});

		const refreshToken = this.jwtAuthService.createRefreshToken({
			sub: user.id,
			email: user.email,
			username: user.username,
		});

		return {
			username: user.username,
			email: user.email,
			token,
			refresh_token: refreshToken,
		};
	}

	async refresh(userId: string) {
		const user = await this.usersRepository.findById(userId);

		if (!user) throw new UnauthorizedException("user not found");

		const token = this.jwtAuthService.createAccessToken({
			sub: user.id,
			email: user.email,
			username: user.username,
		});

		const refreshToken = this.jwtAuthService.createRefreshToken({
			sub: user.id,
			email: user.email,
			username: user.username,
		});

		return { token, refresh_token: refreshToken };
	}
}
