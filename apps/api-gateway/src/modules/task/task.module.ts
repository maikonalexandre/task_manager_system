import { HttpModule as AxiosHttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { EnvService } from "src/config/env/env.service";
import { TasksController } from "./controllers/task.controller";
import { TasksService } from "./services/task.service";

@Module({
	imports: [AxiosHttpModule],
	controllers: [TasksController],
	providers: [TasksService, EnvService],
})
export class TasksModule {}
