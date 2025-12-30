import { WS_EVENTS } from "@repo/shared";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { env } from "../../../../config/env";
import { queryClient } from "../../../../config/react-query";
import { router } from "../../../../router";
import { useAuthStore } from "../../../../store/use-auth-store";
import { getTasksQueryKey } from "../key";

const onReceiveNotification = (data: { message: string; taskId: string }) => {
	queryClient.invalidateQueries({
		queryKey: getTasksQueryKey.detail({ id: data.taskId }),
	});
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
};

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

		Object.entries(WS_EVENTS).forEach(([_, event]) => {
			socket.on(event, onReceiveNotification);
		});

		socketRef.current = socket;
		return () => {
			socket.disconnect();
		};
	}, [accessToken]);

	return children;
}
