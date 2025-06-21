import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import GlobalFloatingCart from "./components/GlobalFloatingCart";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Catering from "./pages/Catering";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Ensure app starts with clean state
const initializeCleanState = () => {
  // Only clear if this is a fresh session (no specific flag set)
  const hasActiveSession = sessionStorage.getItem("hasActiveSession");

  if (!hasActiveSession) {
    // Clear any leftover localStorage from previous sessions
    localStorage.removeItem("cart");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("orderType");
    localStorage.removeItem("currentOrder");

    // Set flag for this session
    sessionStorage.setItem("hasActiveSession", "true");
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/about" element={<About />} />
            <Route path="/catering" element={<Catering />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <GlobalFloatingCart />
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
