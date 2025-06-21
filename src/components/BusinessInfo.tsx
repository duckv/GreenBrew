import { MapPin, Clock, Phone, Award, Coffee, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function BusinessInfo() {
  const stats = [
    {
      icon: Coffee,
      value: "500+",
      label: "Daily Customers",
    },
    {
      icon: Award,
      value: "4.9",
      label: "Star Rating",
    },
    {
      icon: Users,
      value: "15+",
      label: "Years Serving",
    },
  ];

  return (
    <section className="section-padding bg-cafe-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Info Content */}
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-cafe-gray-900 mb-6">
              Your Neighborhood
              <span className="text-brand-pink block">
                Bread & Brew Shop
              </span>
            </h2>

            <p className="text-lg text-cafe-gray-600 mb-8 leading-relaxed">
              Since 2008, we've been baking fresh artisan breads and serving
              premium coffee in Berkeley Heights. Our passion for quality
              ingredients and traditional techniques creates an authentic
              experience that brings the community together.
            </p>

            {/* Contact Information */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-brown rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-cafe-gray-900">Location</h3>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cafe-gray-600 hover:text-brand-brown transition-colors"
                  >
                    123 Main Street, Downtown, City, State 12345
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-brown rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-cafe-gray-900">Phone</h3>
                  <a
                    href="tel:+1234567890"
                    className="text-cafe-gray-600 hover:text-brand-brown transition-colors"
                  >
                    (123) 456-7890
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-brown rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-cafe-gray-900">Hours</h3>
                  <div className="text-cafe-gray-600">
                    <div>Mon-Sat: 7:00 AM - 5:30 PM</div>
                    <div>Sunday: 9:00 AM - 4:00 PM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-8 h-8 text-brand-brown mx-auto mb-2" />
                  <div className="font-heading text-2xl font-bold text-cafe-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-cafe-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Map/Image Placeholder */}
          <div className="relative">
            <Card className="card-elevated overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-cafe-gray-200 to-cafe-gray-300 relative">
                {/* Placeholder for map - in real implementation, integrate Google Maps */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-brand-brown mx-auto mb-4" />
                  <p className="text-cafe-gray-700">
                    Bread N' Br☕︎w
                    <br />
                    512 Springfield Ave
                    <br />
                    Berkeley Heights, NJ 07922
                  </p>
                  <div className="mt-3 space-y-1">
                  <h3 className="font-heading text-lg font-semibold text-cafe-gray-900 mb-2">
                    Bread N' Br☕︎w
                  </h3>
                  <p className="text-sm text-cafe-gray-600 mb-3">
                    512 Springfield Ave, Berkeley Heights
                  </p>
                  <p className="text-sm text-cafe-gray-600 mb-3">
                    123 Main Street, Downtown
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center text-sm text-green-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Open Now
                    </span>
                    <a
                      href="https://maps.google.com/maps?q=512+Springfield+Ave+Berkeley+Heights+NJ+07922"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand-brown hover:text-brand-brown-dark font-medium"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}