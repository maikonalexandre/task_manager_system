import { Button } from "@repo/ui";
import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, PlusCircle } from "lucide-react";
import { useAuthStore } from "../store/use-auth-store";

export const Header = () => {
	const { logout, user } = useAuthStore();
	const navigate = useNavigate();

	return (
		<div className="px-4 py-2 flex justify-between items-center">
			<div className="flex gap-2 items-center">
				<Link to="/">
					<span className="text-lg text-fuchsia-600 font-bold hover:text-fuchsia-300">
						Tasks
					</span>
				</Link>
				<span className="text-xs font-medium  text-zinc-400 pt-1.5">
					{user?.username}
				</span>
			</div>

			<div className="flex items-center gap-2">
				<Button
					onClick={() => {
						navigate({ href: "/tasks/register" });
					}}
					size="sm"
					className="cursor-pointer bg-green-500 text-white hover:bg-green-500/75"
				>
					Nova task <PlusCircle />
				</Button>
				<Button
					onClick={() => {
						logout();
						navigate({ href: "/login" });
					}}
					size="sm"
					className="cursor-pointer bg-red-400 text-white hover:bg-red-400/75"
				>
					Logout <LogOut />
				</Button>
			</div>
		</div>
	);
};
