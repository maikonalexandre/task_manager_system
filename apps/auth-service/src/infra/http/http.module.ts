import { Module } from "@nestjs/common";
import { AuthService } from "src/domain/services/auth.service";
import { DatabaseModule } from "../database/database.module";
import { AuthController } from "./controllers/auth.controller";
import { HealthController } from "./controllers/health.controller";

@Module({
	imports: [DatabaseModule],
	controllers: [HealthController, AuthController],
	providers: [AuthService],
})
export class HttpModule {}
