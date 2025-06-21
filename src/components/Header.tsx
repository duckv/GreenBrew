import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [cartItems, setCartItems] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About", href: "/about" },
    { name: "Catering", href: "/catering" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-cafe-gray-200">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-pink rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">B</span>
            </div>
            <span className="font-heading text-xl md:text-2xl font-bold text-brand-brown">
              Bread N' Br☕︎w
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-cafe-gray-700 hover:text-brand-brown font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Contact Info */}
            <div className="flex items-center space-x-4 text-sm text-cafe-gray-600">
              <a
                href="tel:+19089330123"
                className="flex items-center space-x-1 hover:text-brand-brown transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>(908) 933-0123</span>
              </a>
              <a
                href="https://maps.google.com/maps?q=512+Springfield+Ave+Berkeley+Heights+NJ+07922"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 hover:text-brand-brown transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span>Berkeley Heights</span>
              </a>
            </div>

            {/* Cart */}
            <Button
              variant="outline"
              size="sm"
              className="relative"
              onClick={() => {
                // Cart functionality will be implemented
              }}
            >
              <ShoppingCart className="w-4 h-4" />
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Button>

            {/* Order Online CTA */}
            <Button className="btn-primary">Order Online</Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="relative"
              onClick={() => {
                // Cart functionality will be implemented
              }}
            >
              <ShoppingCart className="w-4 h-4" />
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <span className="font-heading text-lg font-bold text-brand-brown">
                      Menu
                    </span>
                  </div>

                  <nav className="flex flex-col space-y-4 mt-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="text-cafe-gray-700 hover:text-brand-brown font-medium py-2 transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-8 space-y-4">
                    <a
                      href="tel:+19089330123"
                      className="flex items-center space-x-2 text-cafe-gray-600 hover:text-brand-brown transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>(908) 933-0123</span>
                    </a>
                    <a
                      href="https://maps.google.com/maps?q=512+Springfield+Ave+Berkeley+Heights+NJ+07922"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-cafe-gray-600 hover:text-brand-brown transition-colors"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>View Location</span>
                    </a>
                  </div>

                  <div className="mt-auto pb-6">
                    <Button
                      className="btn-primary w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      Order Online
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
