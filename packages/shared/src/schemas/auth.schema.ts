import { z } from "zod";

export const userLoginSchema = z.object({
	email: z.email({ error: "Email obrigatório!" }),
	password: z
		.string({ message: "Senha obrigatória!" })
		.min(6, { message: "A senha precisa ter no minimo 6 digitos!" })
		.max(16, { message: "A senha precisa ter no maximo 6 digitos!" }),
});

export const userRegisterSchema = z.object({
	username: z.string({ error: "Username obrigatório" }).min(3),
	email: z.email({ error: "Email obrigatório!" }),
	password: z
		.string({ message: "Senha obrigatória!" })
		.min(6, { message: "A senha precisa ter no minimo 6 digitos!" })
		.max(16, { message: "A senha precisa ter no maximo 6 digitos!" }),
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

export interface User {
	id: string;
	email: string;
	username: string;
}
