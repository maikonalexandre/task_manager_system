import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "src/config/database/database.module";
import { HealthController } from "./controllers/health.controller";
import { TasksController } from "./controllers/tasks.controller";
import { TaskEntity } from "./entities/task.entity";
import { TaskTypeOrmRepository } from "./repositories/task.repository";
import { TasksService } from "./services/tasks.service";

@Module({
	imports: [DatabaseModule, TypeOrmModule.forFeature([TaskEntity])],
	controllers: [HealthController, TasksController],
	providers: [TasksService, TaskTypeOrmRepository],
	exports: [TasksService],
})
export class TaskModule {}
