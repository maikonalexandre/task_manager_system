import { HttpModule as AxiosHttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { EnvService } from "src/config/env/env.service";
import { CommentController } from "./controllers/comment.controller";
import { TasksController } from "./controllers/task.controller";
import { CommentService } from "./services/comment.service";
import { TasksService } from "./services/task.service";

@Module({
	imports: [AxiosHttpModule],
	controllers: [TasksController, CommentController],
	providers: [TasksService, EnvService, CommentService],
})
export class TasksModule {}
