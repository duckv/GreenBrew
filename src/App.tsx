import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<PlaceholderPage title="About Us" />} />
          <Route
            path="/catering"
            element={<PlaceholderPage title="Catering" />}
          />
          <Route
            path="/contact"
            element={<PlaceholderPage title="Contact" />}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Placeholder component for future pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-screen bg-cafe-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="font-heading text-4xl font-bold text-cafe-gray-900 mb-4">
        {title}
      </h1>
      <p className="text-cafe-gray-600 mb-8">This page is coming soon!</p>
      <a
        href="/"
        className="btn-primary inline-flex items-center px-6 py-3 rounded-full bg-brand-brown text-white hover:bg-brand-brown-dark transition-colors"
      >
        Back to Home
      </a>
    </div>
  </div>
);

export default App;
