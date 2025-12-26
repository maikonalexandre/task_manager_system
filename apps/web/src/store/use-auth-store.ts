import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
	id: string;
	email: string;
	username: string;
}

interface AuthState {
	user: User | null;
	accessToken: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;

	setAuth: (user: User, accessToken: string, refreshToken: string) => void;
	logout: () => void;
	updateToken: (accessToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			accessToken: null,
			refreshToken: null,
			isAuthenticated: false,

			setAuth: (user, accessToken, refreshToken) =>
				set({
					user,
					accessToken,
					refreshToken,
					isAuthenticated: true,
				}),

			logout: () =>
				set({
					user: null,
					accessToken: null,
					refreshToken: null,
					isAuthenticated: false,
				}),

			updateToken: (accessToken: string) => set({ accessToken }),
		}),

		{
			name: "task_challenge_auth_state",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
