import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col justify-center items-center h-dvh min-w[22rem] p-2 ">
			<Outlet />
		</div>
	);
}
