import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRegisterProps } from "@repo/shared";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UserTypeOrmRepository {
	constructor(
		@InjectRepository(UserEntity)
		private readonly repo: Repository<UserEntity>,
	) {}

	async findById(id: string) {
		const user = await this.repo.findOne({ where: [{ id }] });
		if (!user) return null;
		return user;
	}

	async findByEmail(email: string) {
		const user = await this.repo.findOne({ where: [{ email }] });
		if (!user) return null;
		return user;
	}

	async findByUsername(username: string) {
		const user = await this.repo.findOne({ where: [{ username }] });
		if (!user) return null;
		return user;
	}

	async findAll() {
		const [users, count] = await this.repo.findAndCount();
		return { users, count };
	}

	async save(user: UserRegisterProps) {
		await this.repo.save({
			email: user.email,
			username: user.username,
			password: user.password,
		});
	}
}
