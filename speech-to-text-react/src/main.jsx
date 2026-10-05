import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

import "./index.css";
import App from "./App.jsx";

import { queryClient } from "./query/queryClient";
import { queryPersister } from "./query/queryPersister";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{
                persister: queryPersister,
                maxAge: 24 * 60 * 60 * 1000,
            }}
        >
            <App />
        </PersistQueryClientProvider>
    </StrictMode>
);