import "@repo/ui/index.css";

import { Toaster } from "@repo/ui";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { queryClient } from "./config/react-query";
import { router } from "./router";

// biome-ignore lint/style/noNonNullAssertion: this is a vite config
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Toaster richColors theme="light" />
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>,
);
