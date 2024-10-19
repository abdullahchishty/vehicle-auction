import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {
  persistQueryClient,
  persistQueryClientRestore,
} from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./redux/store";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.scss";
import AppRoutes from "./routes";

// Redux Persistor
let persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById("root"));

// Create the React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours cache time
      retry: false,
    },
  },
});

// Create the persister for query client
const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

// Function to initialize and restore the persisted state
const initializeApp = async () => {
  // Restore persisted queries
  await persistQueryClientRestore({
    queryClient: queryClient,
    persister: persister,
  });

  // Persist future queries
  persistQueryClient({
    queryClient: queryClient,
    persister: persister,
    maxAge: 1000 * 60 * 60 * 24, // 24 hours persistence
  });

  // Render the app after initialization is complete
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                <Route path="/*" element={<AppRoutes />} />
              </Routes>
            </BrowserRouter>
            <Toaster position="top-center" />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

// Initialize and render the app
initializeApp();
