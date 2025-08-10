import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Import this
import "./index.css";
import App from "./App.jsx";
import AuthContext from "./Context/AuthContext.jsx";
import UserContext from "./Context/UserContext.jsx";
import ListingContext from "./Context/ListingContext.jsx";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContext>
      <ListingContext>
        <UserContext>
          <App />
        </UserContext>
      </ListingContext>
    </AuthContext>
  </BrowserRouter>
);
