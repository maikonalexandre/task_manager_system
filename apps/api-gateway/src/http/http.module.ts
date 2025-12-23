import { Module } from "@nestjs/common";
import { AuthService } from "src/services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { HealthController } from "./controllers/health.controller";
import { HttpModule as AxiosHttpModule } from "@nestjs/axios";
import { EnvService } from "src/env/env.service";

@Module({
	imports: [AxiosHttpModule],
	controllers: [HealthController, AuthController],
	providers: [AuthService, EnvService],
})
export class HttpModule {}
