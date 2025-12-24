import z from "zod";

export const envSchema = z.object({
	PORT: z.coerce.number().optional().default(3003),
	DB_HOST: z.string(),
	DB_PORT: z.coerce.number(),
	DB_USERNAME: z.string(),
	DB_PASSWORD: z.coerce.string(),
	DB_DATABASE: z.string(),
	RABBITMQ_URL: z.string(),
});

export type ENV = z.infer<typeof envSchema>;
