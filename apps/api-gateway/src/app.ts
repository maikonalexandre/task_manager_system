import { ClientRequest, IncomingMessage } from "node:http";
import { Socket } from "node:net";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import { AxiosErrorInterceptor } from "./common/axios-error.interceptor";
import { EnvService } from "./config/env/env.service";
import { setupSwagger } from "./config/swagger";

export function setupApp(app: INestApplication) {
	app.setGlobalPrefix("api");
	setupSwagger(app);
	app.enableCors({
		origin: "*",
	});

	const jwtService = app.get(JwtService);
	const envService = app.get(EnvService);

	app.use(
		"/socket.io",
		createProxyMiddleware({
			target: envService.get("NOTIFICATION_SERVICE_API_URL"),
			ws: true,
			changeOrigin: true,
			on: {
				proxyReqWs: (
					proxyReq: ClientRequest,
					req: IncomingMessage,
					socket: Socket,
				) => {
					try {
						const url = new URL(`http://${req.headers.host}/${req.url}`);
						const token = url.searchParams.get("access_token");

						if (!token) throw new Error("Unautorized");

						const publicKey = envService.get("AUTH_SERVICE_PUBLIC_KEY");

						const payload = jwtService.verify(token, {
							algorithms: ["RS256"],
							publicKey: Buffer.from(publicKey, "base64"),
						});

						proxyReq.setHeader("x-user-id", payload.sub);
					} catch (_) {
						socket.destroy();
					}
				},
			},
		} as Options),
	);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	app.useGlobalInterceptors(new AxiosErrorInterceptor());
}
