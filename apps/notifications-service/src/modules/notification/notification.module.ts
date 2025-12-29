import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DatabaseModule } from "../../config/database/database.module";
import { NotificationsController } from "./controllers/notification.controller";
import { NotificationEntity } from "./entities/notification.entity";
import { NotificationGateway } from "./gateway/notification.gateway";
import { NotificationTypeOrmRepository } from "./repositories/notification.repository";
import { NotificationService } from "./services/notification.service";

@Module({
	imports: [DatabaseModule, TypeOrmModule.forFeature([NotificationEntity])],
	controllers: [NotificationsController],
	providers: [
		NotificationService,
		NotificationTypeOrmRepository,
		NotificationGateway,
	],
	exports: [NotificationService],
})
export class NotificationModule {}
