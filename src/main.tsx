import React from "react";
import ReactDOM from "react-dom/client";;
import "bootstrap/dist/css/bootstrap.css";
import "./styles/App.css"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
