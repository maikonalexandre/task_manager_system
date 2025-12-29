import { WS_EVENTS } from "@repo/shared";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { env } from "../../../../config/env";
import { router } from "../../../../router";
import { useAuthStore } from "../../../../store/use-auth-store";

export function NotificationProvider({ children }: { children: ReactNode }) {
	const { accessToken } = useAuthStore();
	const socketRef = useRef<Socket | null>(null);

	useEffect(() => {
		if (!accessToken) return;

		const socket = io(env.VITE_API_URL.replace("/api", ""), {
			query: { access_token: accessToken },
			transports: ["websocket"],
		});

		socket.on("connect", () => console.log("✅ WS connected"));
		socket.on("disconnect", () => console.log("❌ WS disconnect"));
		socket.on("connect_error", (err) =>
			console.error("❌ WS error", err.message),
		);

		socket.on(WS_EVENTS.COMMENT_CREATED, (data) => {
			toast(data.message, {
				action: {
					label: "Ver mais...",
					onClick: () =>
						router.navigate({
							to: "/tasks/$taskId",
							params: { taskId: data.taskId },
						}),
				},
			});
		});

		socketRef.current = socket;
		return () => {
			socket.disconnect();
		};
	}, [accessToken]);

	return <>{children}</>;
}
