/**
 * Home page component
 * Main landing page with hero section, featured menu, and business info
 */
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedMenu from "@/components/FeaturedMenu";
import BusinessInfo from "@/components/BusinessInfo";
import Footer from "@/components/Footer";

/**
 * Index page component - Main homepage
 * @returns {JSX.Element} Complete homepage with all sections
 */
const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Site header with navigation */}
      <Header />

      {/* Main content sections */}
      <main>
        {/* Hero banner section */}
        <HeroSection />

        {/* Featured menu items */}
        <FeaturedMenu />

        {/* Business information and hours */}
        <BusinessInfo />
      </main>

      {/* Site footer */}
      <Footer />
    </div>
  );
};

export default Index;
