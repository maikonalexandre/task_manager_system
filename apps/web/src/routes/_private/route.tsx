import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Header } from "../../components/header";
import { NotificationProvider } from "../../features/private/tasks/components/notificationProvider";
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
		<NotificationProvider>
			<div className="max-w-5xl m-auto">
				<Header />
				<div className="p-4" />
				<Outlet />
			</div>
		</NotificationProvider>
	);
}
