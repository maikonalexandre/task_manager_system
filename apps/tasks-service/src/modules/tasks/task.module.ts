import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "src/config/database/database.module";
import { CommentController } from "./controllers/comment.controller";
import { HealthController } from "./controllers/health.controller";
import { TasksController } from "./controllers/tasks.controller";
import { CommentEntity } from "./entities/comments.entity";
import { TaskEntity } from "./entities/task.entity";
import { CommentsTypeOrmRepository } from "./repositories/comments.repository";
import { TaskTypeOrmRepository } from "./repositories/task.repository";
import { CommentService } from "./services/comment.service";
import { TasksService } from "./services/tasks.service";

@Module({
	imports: [
		DatabaseModule,
		TypeOrmModule.forFeature([TaskEntity, CommentEntity]),
	],
	exports: [TasksService, CommentService],
	controllers: [HealthController, TasksController, CommentController],
	providers: [
		TasksService,
		CommentService,
		TaskTypeOrmRepository,
		CommentsTypeOrmRepository,
	],
})
export class TaskModule {}
