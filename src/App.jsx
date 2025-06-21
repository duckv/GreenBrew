/**
 * Main App component with routing and global providers
 * Sets up the application with React Query, Cart Context, and routing
 */
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

// Initialize React Query client for data fetching
const queryClient = new QueryClient();

/**
 * Root App component with all providers and routing
 * @returns {JSX.Element} Complete application structure
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        {/* Global toast notifications */}
        <Toaster />
        <Sonner />

        {/* Main router configuration */}
        <BrowserRouter>
          <Routes>
            {/* Main application routes */}
            <Route path="/" element={<Index />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/about" element={<About />} />
            <Route path="/catering" element={<Catering />} />
            <Route path="/contact" element={<Contact />} />

            {/* Catch-all route for 404 pages - MUST BE LAST */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Global floating cart component */}
          <GlobalFloatingCart />
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
