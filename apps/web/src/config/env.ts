import { z } from "zod";

const envSchema = z.object({
	VITE_PORT: z.coerce.number(),
	VITE_ENVIRONMENT: z.enum(["dev", "prod", "test"]).optional().default("dev"),
	VITE_API_URL: z.string().default("http://localhost:3001/api"),
	VITE_REQUEST_DELAY_MS: z.coerce.number().default(0),
});

export const env = envSchema.parse(import.meta.env);
