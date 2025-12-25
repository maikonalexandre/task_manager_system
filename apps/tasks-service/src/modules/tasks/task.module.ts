import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RABBITMQ_CONFIG } from "@repo/shared";
import { DatabaseModule } from "src/config/database/database.module";
import { EnvModule } from "src/config/env/env.module";
import { EnvService } from "src/config/env/env.service";
import { CommentController } from "./controllers/comment.controller";
import { HealthController } from "./controllers/health.controller";
import { TasksController } from "./controllers/tasks.controller";
import { CommentEntity } from "./entities/comments.entity";
import { TaskHistoryEntity } from "./entities/history.entity";
import { TaskEntity } from "./entities/task.entity";
import { CommentsTypeOrmRepository } from "./repositories/comments.repository";
import { TaskHistoryTypeOrmRepository } from "./repositories/history.entity";
import { TaskTypeOrmRepository } from "./repositories/task.repository";
import { CommentService } from "./services/comment.service";
import { TasksService } from "./services/tasks.service";

@Module({
	imports: [
		DatabaseModule,
		EnvModule,
		TypeOrmModule.forFeature([TaskEntity, CommentEntity, TaskHistoryEntity]),
		ClientsModule.registerAsync([
			{
				name: RABBITMQ_CONFIG.TASKS_CLIENT_TOKEN,
				imports: [EnvModule],
				inject: [EnvService],
				useFactory: async (env: EnvService) => ({
					transport: Transport.RMQ,
					options: {
						urls: [env.get("RABBITMQ_URL")],
						queue: RABBITMQ_CONFIG.TASKS_QUEUE,
						queueOptions: {
							durable: true,
						},
					},
				}),
			},
		]),
	],
	exports: [TasksService, CommentService],
	controllers: [HealthController, TasksController, CommentController],
	providers: [
		TasksService,
		CommentService,
		TaskTypeOrmRepository,
		CommentsTypeOrmRepository,
		TaskHistoryTypeOrmRepository,
	],
})
export class TaskModule {}
