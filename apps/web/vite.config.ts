import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		plugins: [
			tanstackRouter({
				target: "react",
				autoCodeSplitting: true,
			}),
			tailwindcss(),
			react(),
		],

		server: {
			port: parseInt(env.VITE_PORT, 2) || 3000,
			host: true,
		},

		resolve: {
			alias: {
				"@repo/shared": path.resolve(
					__dirname,
					"../../packages/shared/src/index.ts",
				),
			},
		},
	};
});
