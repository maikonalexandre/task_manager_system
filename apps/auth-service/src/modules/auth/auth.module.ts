import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "src/modules/auth/services/auth.service";
import { JwtModule } from "../../common/jwt.module";
import { DatabaseModule } from "../../config/database/database.module";
import { AuthController } from "./controllers/auth.controller";
import { HealthController } from "./controllers/health.controller";
import { UserEntity } from "./entities/user.entity";
import { UserTypeOrmRepository } from "./repositories/user.repository";

@Module({
	imports: [DatabaseModule, JwtModule, TypeOrmModule.forFeature([UserEntity])],
	controllers: [HealthController, AuthController],
	providers: [AuthService, UserTypeOrmRepository],
	exports: [AuthService],
})
export class AuthModule {}
