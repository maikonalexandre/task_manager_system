import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "../../features/public/login";

export const Route = createFileRoute("/_public/login")({
	component: LoginPage,
});
