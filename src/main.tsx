import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/reset.css";
import "./styles/global.css";
import "@fontsource/geist-sans";
import { BrowserRouter, Route, Routes } from "react-router";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import ProtectedLayout from "./layouts/ProtectedLayout.tsx";
import AppLayout from "./layouts/AppLayout.tsx";
import Todos from "./pages/Todos.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedLayout />}>
            <Route element={<AppLayout />}>
              <Route path="/todos" element={<Todos />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
