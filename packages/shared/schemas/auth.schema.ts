import { z } from "zod";

export const userLoginSchema = z.object({
	email: z.email(),
	password: z.string().min(6).max(16),
});

export type UserLoginProps = z.infer<typeof userLoginSchema>;

export const userRegisterSchema = z.object({
	email: z.email(),
	username: z.string().min(3),
	password: z.string().min(6).max(16),
});

export type UserRegisterProps = z.infer<typeof userRegisterSchema>;
