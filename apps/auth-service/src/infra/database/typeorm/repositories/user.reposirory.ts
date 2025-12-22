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

	async findByEmailOrUsername(value: string): Promise<User | null> {
		const user = await this.repo.findOne({
			where: [{ email: value }, { username: value }],
		});

		if (!user) return null;

		return new User(
			user.id,
			user.email,
			user.username,
			user.password,
			// user.createdAt,
			// user.updatedAt,
		);
	}

	async save(user: User): Promise<void> {
		await this.repo.save({
			id: user.id,
			email: user.email,
			username: user.username,
			password: user.password,
		});
	}
}
