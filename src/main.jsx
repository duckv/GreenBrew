/**
 * Main application entry point
 * Initializes React and renders the root App component
 */
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Create root element and render the main App component
createRoot(document.getElementById("root")).render(<App />);
