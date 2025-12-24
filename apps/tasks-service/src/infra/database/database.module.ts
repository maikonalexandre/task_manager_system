import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnvModule } from "../env/env.module";
import { EnvService } from "../env/env.service";
import { TaskEntity } from "./typeorm/entities/task.entity";
import { TaskTypeOrmRepository } from "./typeorm/repositories/task.reposirory";

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
		TypeOrmModule.forFeature([TaskEntity]),
	],

	providers: [TaskTypeOrmRepository],
	exports: [TaskTypeOrmRepository],
})
export class DatabaseModule {}
