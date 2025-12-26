import { createFileRoute, Outlet } from "@tanstack/react-router";
import { router } from "../../router";

export const Route = createFileRoute("/_private")({
	component: AuthLayout,
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated || !context.auth.user) {
			router.navigate({ to: "/login" });
		}
	},
});

function AuthLayout() {
	return (
		<div>
			<h1>Layout</h1>
			<Outlet />
		</div>
	);
}
