import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=2047&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Perfect Brews,{" "}
          <span className="text-brand-pink">Fine Patisseries</span>
        </h1>

        <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Artisan gelato, premium coffee, and fresh pastries crafted daily with
          the finest ingredients
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
          <div className="flex items-center space-x-2 text-gray-200">
            <MapPin className="w-5 h-5 text-brand-pink" />
            <span>123 Main Street, Downtown</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-200">
            <Clock className="w-5 h-5 text-brand-pink" />
            <span>Open Daily 7AM - 5:30PM</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            size="lg"
            className="btn-primary text-lg px-8 py-4"
            onClick={() => {
              // Navigate to menu with location selection
              document
                .getElementById("menu-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View Menu
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="btn-secondary text-lg px-8 py-4 bg-white/20 border-white text-white hover:bg-white hover:text-brand-brown"
            onClick={() => {
              window.open("tel:+1234567890", "_self");
            }}
          >
            Call to Order
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
