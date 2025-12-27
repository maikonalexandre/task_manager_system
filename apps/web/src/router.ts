import { createRouter } from "@tanstack/react-router";
import type { RouterContext } from "./_types/routes";
import { queryClient } from "./config/react-query";
import { routeTree } from "./routeTree.gen";
import { useAuthStore } from "./store/use-auth-store";

export const router = createRouter({
	routeTree,
	context: {
		queryClient,
		auth: {
			get isAuthenticated() {
				return useAuthStore.getState().isAuthenticated;
			},
			get user() {
				return useAuthStore.getState().user;
			},
		},
	} as RouterContext,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
