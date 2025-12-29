import type { UserLoginProps, UserRegisterProps } from "@repo/shared";
import { api } from "../../../config/api";

const login = async (body: UserLoginProps) => {
	const { data } = await api.post("/auth/login", body);
	return data;
};

const register = async (body: UserRegisterProps) => {
	const { data } = await api.post("/auth/register", body);
	return data;
};

const listUsers = async () => {
	const { data } = await api.get("/auth/users");
	return data;
};

export const AuthService = {
	login,
	register,
	listUsers,
};
