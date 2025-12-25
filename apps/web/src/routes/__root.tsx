import { createRootRoute, Outlet } from "@tanstack/react-router";

const RootLayout = () => (
	<div>
		<Outlet />
	</div>
);

export const Route = createRootRoute({ component: RootLayout });
