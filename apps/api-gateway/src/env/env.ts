import z from "zod";

export const envSchema = z.object({
	PORT: z.coerce.number().optional().default(3001),
	AUTH_SERVICE_API_URL: z.url(),
	AUTH_SERVICE_PUBLIC_KEY: z.string(),
});

export type ENV = z.infer<typeof envSchema>;
