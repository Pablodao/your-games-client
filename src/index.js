import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//? Packages
import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./context/auth.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthWrapper>
        <App />
      </AuthWrapper>
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();
