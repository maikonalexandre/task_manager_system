import { Module } from "@nestjs/common";
import { JwtModule as NestJwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { EnvService } from "../env/env.service";
import { JwtService } from "./jwt.service";
import { JwtStrategy, JwtStrategyRefresh } from "./jwt.strategy";

@Module({
	imports: [PassportModule, NestJwtModule.register({ global: true })],
	providers: [EnvService, JwtStrategy, JwtStrategyRefresh, JwtService],
	exports: [JwtService],
})
export class JwtModule {}
