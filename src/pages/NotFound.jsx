/**
 * 404 Not Found page component
 * Displayed when users navigate to non-existent routes
 */
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * NotFound page component for 404 errors
 * @returns {JSX.Element} 404 error page with navigation options
 */
const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Site header */}
      <Header />

      {/* Main 404 content */}
      <main className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-6 p-8">
          {/* Large 404 heading */}
          <h1 className="text-6xl font-bold text-brand-brown">404</h1>

          {/* Error message */}
          <h2 className="text-2xl font-semibold text-gray-700">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-gray-600 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. The page might
            have been moved or doesn't exist.
          </p>

          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-primary">
              <Link to="/">Go Home</Link>
            </Button>

            <Button asChild variant="outline">
              <Link to="/menu">View Menu</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Site footer */}
      <Footer />
    </div>
  );
};

export default NotFound;
