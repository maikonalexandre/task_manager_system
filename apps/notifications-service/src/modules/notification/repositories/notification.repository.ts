import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateNotificationProps } from "@repo/shared";
import { Repository } from "typeorm";
import { NotificationEntity } from "../entities/notification.entity";

@Injectable()
export class NotificationTypeOrmRepository {
	constructor(
		@InjectRepository(NotificationEntity)
		private readonly repo: Repository<NotificationEntity>,
	) {}

	async save(notificationProps: CreateNotificationProps) {
		return this.repo.save({
			content: notificationProps.content,
			metadata: { taskId: notificationProps.metadata?.taskId },
			userId: notificationProps.userId,
			type: notificationProps.type,
		});
	}

	// async findById(id: string) {
	// 	const user = await this.repo.findOne({ where: [{ id }] });
	// 	if (!user) return null;
	// 	return user;
	// }

	// async findByEmail(email: string) {
	// 	const user = await this.repo.findOne({ where: [{ email }] });
	// 	if (!user) return null;
	// 	return user;
	// }

	// async findByUsername(username: string) {
	// 	const user = await this.repo.findOne({ where: [{ username }] });
	// 	if (!user) return null;
	// 	return user;
	// }

	// async findAll() {
	// 	const [users, count] = await this.repo.findAndCount();
	// 	return { users, count };
	// }

	// async save(user: UserRegisterProps) {
	// 	await this.repo.save({
	// 		email: user.email,
	// 		username: user.username,
	// 		password: user.password,
	// 	});
	// }
}
