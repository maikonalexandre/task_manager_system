import { createFileRoute } from "@tanstack/react-router";
import { RegisterPage } from "../../features/public/auth/register";

export const Route = createFileRoute("/_public/register")({
	component: RegisterPage,
});
