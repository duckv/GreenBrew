import { Link } from "react-router-dom";
import {
  Phone,
  MapPin,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-cafe-gray-900 text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span className="font-heading text-xl font-bold text-white">
                Bread N' Br☕︎w
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Artisan gelato, premium coffee, and fresh pastries crafted daily
              with passion and the finest ingredients.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-pink transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-pink transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-pink transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/menu"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/catering"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Catering
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">
              Contact Info
            </h3>
            <div className="space-y-3">
              <a
                href="tel:+19089330123"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 text-brand-pink group-hover:text-white" />
                <span>(908) 933-0123</span>
              </a>
              <a
                href="mailto:breadnbrew512@gmail.com"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 text-brand-pink group-hover:text-white" />
                <span>breadnbrew512@gmail.com</span>
              </a>
              <a
                href="https://maps.google.com/maps?q=512+Springfield+Ave+Berkeley+Heights+NJ+07922"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-2 text-gray-400 hover:text-white transition-colors group"
              >
                <MapPin className="w-4 h-4 text-brand-pink group-hover:text-white mt-0.5" />
                <span>512 Springfield Ave, Berkeley Heights, NJ 07922</span>
              </a>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4 flex items-center">
              <Clock className="w-5 h-5 text-brand-pink mr-2" />
              Business Hours
            </h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex justify-between">
                <span>Monday - Saturday</span>
                <span className="text-white">7:00 AM - 5:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="text-white">9:00 AM - 4:00 PM</span>
              </div>
              <div className="mt-4 text-sm">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span className="text-green-400">Open Now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Bread N' Br☕︎w. All rights
              reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/accessibility"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
