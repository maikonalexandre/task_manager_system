import { z } from "zod";

const envSchema = z.object({
	VITE_ENVIRONMENT: z.enum(["dev", "prod", "test"]).optional().default("dev"),
	VITE_API_URL: z.string().default("http://localhost:3001/api"),
	VITE_ENABLE_REQUEST_DELAY: z.coerce.boolean().default(false),
});

export const env = envSchema.parse(import.meta.env);
