import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./reset.css";
import "./index.css";

import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route index path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>
);
