import { Button } from "@repo/ui";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<Button>Teste</Button>
		</div>
	);
}
