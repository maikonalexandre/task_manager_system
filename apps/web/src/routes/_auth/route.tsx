import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
	component: AuthLayout,
	beforeLoad: ({ context, location }) => {
		if (!context.auth.isAuthenticated) {
			throw redirect({
				href: "/login",
				search: { redirect: location.href },
			});
		}
		console.log("OK", context, location, context.auth.user);
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
