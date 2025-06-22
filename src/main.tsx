import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Clean slate initialization - clear all stored data
const initializeCleanSlate = () => {
  // Clear all localStorage data
  localStorage.removeItem("cart");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("orderType");
  localStorage.removeItem("checkoutUserInfo");
  localStorage.removeItem("currentOrder");

  // Clear any session storage
  sessionStorage.clear();
};

// Initialize clean slate on app load
initializeCleanSlate();

createRoot(document.getElementById("root")!).render(<App />);
