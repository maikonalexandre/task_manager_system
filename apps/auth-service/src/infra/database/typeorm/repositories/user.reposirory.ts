import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../../../domain/entities/user.entity";
import { UserRepository } from "../../../../domain/repositories/user.repository";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UserTypeOrmRepository implements UserRepository {
	constructor(
		@InjectRepository(UserEntity)
		private readonly repo: Repository<UserEntity>,
	) {}

	async findByEmail(email: string) {
		const user = await this.repo.findOne({ where: [{ email: email }] });
		if (!user) return null;
		return user;
	}

	async save(user: Omit<User, "id">) {
		await this.repo.save({
			email: user.email,
			username: user.username,
			password: user.password,
		});
	}
}
