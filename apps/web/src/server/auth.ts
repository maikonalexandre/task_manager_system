import type { UserLoginProps } from "@repo/shared";
import { api } from "../config/api";

const login = async (body: UserLoginProps) => {
	const { data } = await api.post("/auth/login", body);
	return data;
};

export const AuthService = {
	login,
};
