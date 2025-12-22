import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnvModule } from "../env/env.module";
import { EnvService } from "../env/env.service";
import { UserEntity } from "./typeorm/entities/user.entity";
import { UserTypeOrmRepository } from "./typeorm/repositories/user.reposirory";

@Module({
	imports: [
		EnvModule,
		TypeOrmModule.forRootAsync({
			imports: [EnvModule],
			inject: [EnvService],
			useFactory: (env: EnvService) => {
				return {
					type: "postgres",
					host: env.get("DB_HOST"),
					port: env.get("DB_PORT"),
					username: env.get("DB_USERNAME"),
					password: env.get("DB_PASSWORD"),
					database: env.get("DB_DATABASE"),
					autoLoadEntities: true,
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
