import { MapPin, Clock, Phone, Award, Coffee, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function BusinessInfo() {
  const stats = [
    {
      icon: Coffee,
      value: "TBD",
      label: "Daily Customers",
    },
    {
      icon: Award,
      value: "TBD",
      label: "Star Rating",
    },
    {
      icon: Users,
      value: "2025",
      label: "Grand Opening",
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
              <span className="text-pink-500 block">Bread & Brew Shop</span>
            </h2>

            <p className="text-lg text-cafe-gray-600 mb-8 leading-relaxed">
              Opening in 2025, we're excited to bring fresh artisan breads and
              premium coffee to Berkeley Heights. Our passion for quality
              ingredients and traditional techniques will create an authentic
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
                    href="https://maps.google.com/maps?q=512+Springfield+Ave+Berkeley+Heights+NJ+07922"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cafe-gray-600 hover:text-brand-brown transition-colors"
                  >
                    512 Springfield Ave, Berkeley Heights, NJ 07922
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
                    href="tel:+19089330123"
                    className="text-cafe-gray-600 hover:text-brand-brown transition-colors"
                  >
                    (908) 933-0123
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

          {/* Interactive Map */}
          <div className="relative">
            <Card className="card-elevated overflow-hidden">
              <div className="aspect-[4/3] relative">
                {/* Google Maps Embed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3020.1234567890123!2d-74.4167!3d40.6833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3a9b1234567890%3A0x1234567890abcdef!2s512%20Springfield%20Ave%2C%20Berkeley%20Heights%2C%20NJ%2007922!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                  title="Bread N' Br☕︎w Location Map"
                ></iframe>

                {/* Overlay with store info */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-6">
                  <h3 className="font-heading text-lg font-semibold text-cafe-gray-900 mb-2">
                    Bread N' Br☕︎w
                  </h3>
                  <p className="text-sm text-cafe-gray-600 mb-3">
                    512 Springfield Ave, Berkeley Heights
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center text-sm text-orange-600">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                      Coming Soon 2025
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
