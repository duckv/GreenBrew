import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedMenu from "@/components/FeaturedMenu";
import BusinessInfo from "@/components/BusinessInfo";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedMenu />
        <BusinessInfo />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
