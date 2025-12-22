import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ENV } from "../../config/env";
import { UserEntity } from "./entities/user.entity";
import { UserTypeOrmRepository } from "./repositories/user.reposirory";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService<ENV, true>) => {
				return {
					type: "postgres",
					host: configService.get("DB_HOST"),
					port: configService.get("DB_PORT"),
					username: configService.get("DB_USERNAME"),
					password: configService.get("DB_PASSWORD"),
					database: configService.get("DB_DATABASE"),
					entities: [UserEntity],
					synchronize: true,
				};
			},
		}),

		TypeOrmModule.forFeature([UserEntity]),
	],

	providers: [UserTypeOrmRepository],
	exports: [UserTypeOrmRepository],
})
export class DatabaseModule {}
