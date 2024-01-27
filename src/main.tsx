import React from "react";
import "./index.css";
import routes from "./routes";
import ReactDOM from "react-dom/client";
import "./i18n";
import { AnimatePresence } from "framer-motion";
// React Router Dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter(routes);
// TanStack Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AnimatePresence>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </AnimatePresence>
    </React.StrictMode>
);
