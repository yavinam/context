import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { ContextProvider } from "./context/index.jsx";

createRoot(document.getElementById("root")).render(
  <Router>
    <ContextProvider>
      <App />
    </ContextProvider>
  </Router>
);
