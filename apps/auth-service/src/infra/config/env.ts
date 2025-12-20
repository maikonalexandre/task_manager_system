import z from "zod";

export const envSchema = z.object({
	PORT: z.coerce.number().optional().default(3002),
	HOST: z.coerce.string().optional().default("0.0.0.0"),
});

export type ENV = z.infer<typeof envSchema>;
