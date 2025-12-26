import type { User } from "@repo/shared";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface setUserProps {
	user: User;
	accessToken: string;
	refreshToken: string;
}

type revalidateTokenProps = Omit<setUserProps, "user">;

interface AuthState {
	user: User | null;
	accessToken: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;

	login: (props: setUserProps) => void;
	logout: () => void;
	revalidateToken: (props: revalidateTokenProps) => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => {
			return {
				user: null,
				accessToken: null,
				refreshToken: null,
				isAuthenticated: false,

				login: ({ accessToken, refreshToken, user }) => {
					return set({
						user,
						accessToken,
						refreshToken,
						isAuthenticated: true,
					});
				},

				logout: () => {
					return set({
						user: null,
						accessToken: null,
						refreshToken: null,
						isAuthenticated: false,
					});
				},

				revalidateToken: ({ accessToken, refreshToken }) => {
					return set({ accessToken, refreshToken });
				},
			};
		},

		{
			name: "task_challenge_auth_state",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
