import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { RouterContext } from "../_types/routes";

export const Route = createRootRouteWithContext<RouterContext>()({
	component: Outlet,
});
