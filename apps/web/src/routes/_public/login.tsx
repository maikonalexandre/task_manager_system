import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "../../features/public/auth/login";

export const Route = createFileRoute("/_public/login")({
	component: LoginPage,
});
