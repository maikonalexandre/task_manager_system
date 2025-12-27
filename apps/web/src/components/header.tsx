import { Button } from "@repo/ui";
import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useAuthStore } from "../store/use-auth-store";

export const Header = () => {
	const { logout } = useAuthStore();
	const navigate = useNavigate();

	return (
		<div className="px-4 py-2 flex justify-between items-center">
			<span className="text-lg text-fuchsia-600 font-bold">Tasks</span>
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
	);
};
