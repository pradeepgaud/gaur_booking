import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Import this
import "./index.css";
import App from "./App.jsx";
import AuthContext from "./Context/AuthContext.jsx";
import UserContext from "./Context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContext>
      <UserContext>
        <App />
      </UserContext>
    </AuthContext>
  </BrowserRouter>
);
