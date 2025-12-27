import { z } from "zod";

export const userLoginSchema = z.object({
	email: z.email(),
	password: z.string().min(6).max(16),
});

export const userRegisterSchema = z.object({
	email: z.email(),
	username: z.string().min(3),
	password: z.string().min(6).max(16),
});

export const tokenPayloadSchema = z.object({
	sub: z.uuid(),
	username: z.string(),
	email: z.email(),
});

export interface LoginData {
	user: User;
	access_token: string;
	refresh_token: string;
}

export type UserLoginProps = z.infer<typeof userLoginSchema>;
export type UserTokenPayload = z.infer<typeof tokenPayloadSchema>;
export type UserRegisterProps = z.infer<typeof userRegisterSchema>;

export interface User extends UserLoginProps {
	id: string;
}
