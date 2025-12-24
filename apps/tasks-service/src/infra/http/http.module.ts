import { Module } from "@nestjs/common";
import { TasksService } from "src/domain/services/tasks.service";
import { DatabaseModule } from "../database/database.module";
import { HealthController } from "./controllers/health.controller";
import { TasksController } from "./controllers/tasks.controller";

@Module({
	imports: [DatabaseModule],
	controllers: [HealthController, TasksController],
	providers: [TasksService],
})
export class HttpModule {}
