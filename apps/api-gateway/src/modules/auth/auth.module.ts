import { HttpModule as AxiosHttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { EnvService } from "src/config/env/env.service";
import { AuthService } from "src/modules/auth/services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { HealthController } from "./controllers/health.controller";

@Module({
	imports: [AxiosHttpModule],
	controllers: [HealthController, AuthController],
	providers: [AuthService, EnvService],
})
export class AuthModule {}
