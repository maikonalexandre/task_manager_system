import { Module } from "@nestjs/common";
import { AuthService } from "src/domain/services/auth.service";
import { JwtModule } from "../auth/jwt.module";
import { DatabaseModule } from "../database/database.module";
import { AuthController } from "./controllers/auth.controller";
import { HealthController } from "./controllers/health.controller";

@Module({
	imports: [DatabaseModule, JwtModule],
	controllers: [HealthController, AuthController],
	providers: [AuthService],
})
export class HttpModule {}
