import {
	OnGatewayConnection,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: true })
export class NotificationGateway implements OnGatewayConnection {
	@WebSocketServer()
	server!: Server;

	handleConnection(client: Socket) {
		const userId = client.handshake.headers["x-user-id"];
		if (userId) client.join(userId);
	}

	sendNotificationToUser({
		userId,
		payload,
		event,
	}: {
		userId: string;
		event: string;
		payload: { message: string; taskId: string };
	}) {
		this.server.to(userId).emit(event, payload);
	}
}
