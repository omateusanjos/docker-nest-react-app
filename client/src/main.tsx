import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./pages/list";
import IndexPage from "./pages/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const rootElement = document.getElementById("root") as HTMLElement;
const RoutesComponent = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/list" element={<List />} />
    </Routes>
  </BrowserRouter>
);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RoutesComponent />
    </QueryClientProvider>
  </React.StrictMode>
);
