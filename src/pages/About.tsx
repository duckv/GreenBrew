import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Coffee, Award } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Coffee,
      title: "Quality Ingredients",
      description:
        "We source only the finest ingredients for our artisan breads, coffee, and fresh pastries.",
    },
    {
      icon: Heart,
      title: "Community First",
      description:
        "Serving Berkeley Heights with passion and dedication to our local community.",
    },
    {
      icon: Users,
      title: "Family Owned",
      description:
        "A family-run business that treats every customer like part of our extended family.",
    },
    {
      icon: Award,
      title: "Artisan Crafted",
      description:
        "Every item is handcrafted with traditional techniques and modern innovation.",
    },
  ];

  return (
    <div className="min-h-screen bg-cafe-gray-50">
      <Header />

      <main className="section-padding">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-cafe-gray-900 mb-6">
              About Bread N' Br☕︎w
            </h1>
            <p className="text-lg md:text-xl text-cafe-gray-600 max-w-3xl mx-auto leading-relaxed">
              Located in the heart of Berkeley Heights, we're passionate about
              crafting exceptional artisan breads, premium coffee, and delicious
              pastries that bring our community together every day.
            </p>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-heading text-3xl font-bold text-cafe-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-cafe-gray-600">
                <p>
                  Bread N' Br☕︎w opened its doors in 2025 with a simple
                  mission: to create a warm, welcoming space where neighbors
                  become friends over freshly baked bread and perfectly brewed
                  coffee.
                </p>
                <p>
                  Our new bakery is Berkeley Heights' newest gathering place,
                  where we serve everything from artisan gelato and premium
                  coffee to hearty breakfast sandwiches and wood-fired pizzas.
                </p>
                <p>
                  Every morning, our bakers arrive before dawn to prepare fresh
                  sourdough, focaccia, and seasonal pastries using time-honored
                  techniques and the finest local ingredients.
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Inside Bread N' Brew cafe"
                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-cafe-gray-900 text-center mb-12">
              What We Believe In
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="card-elevated text-center hover:scale-105 transition-transform duration-300"
                >
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-brand-brown rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-cafe-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-cafe-gray-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-bold text-cafe-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-cafe-gray-600 max-w-2xl mx-auto mb-12">
              Our dedicated team of bakers, baristas, and staff work together to
              create the perfect experience for every customer who walks through
              our doors.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Head Baker",
                  image:
                    "https://images.unsplash.com/photo-1494790108755-2616b612b641?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                },
                {
                  name: "Mike Chen",
                  role: "Coffee Roaster",
                  image:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                },
                {
                  name: "Emma Rodriguez",
                  role: "Pastry Chef",
                  image:
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                },
              ].map((member, index) => (
                <Card key={index} className="card-elevated overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <CardContent className="p-6 text-center">
                    <h3 className="font-heading text-xl font-semibold text-cafe-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-brand-brown font-medium">
                      {member.role}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Location Info */}
          <Card className="card-elevated">
            <CardContent className="p-8 text-center">
              <h2 className="font-heading text-2xl font-bold text-cafe-gray-900 mb-4">
                Visit Us Today
              </h2>
              <div className="space-y-2 text-cafe-gray-600 mb-6">
                <p className="text-lg">512 Springfield Ave</p>
                <p className="text-lg">Berkeley Heights, NJ 07922</p>
                <a
                  href="tel:+19089330123"
                  className="text-brand-brown hover:text-brand-brown-dark font-medium"
                >
                  (908) 933-0123
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div>
                  <h3 className="font-medium text-cafe-gray-900 mb-2">Hours</h3>
                  <div className="text-sm text-cafe-gray-600 space-y-1">
                    <p>Monday - Saturday: 7:00 AM - 5:30 PM</p>
                    <p>Sunday: 9:00 AM - 4:00 PM</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-cafe-gray-900 mb-2">
                    Contact
                  </h3>
                  <div className="text-sm text-cafe-gray-600 space-y-1">
                    <p>
                      <a
                        href="mailto:breadnbrew512@gmail.com"
                        className="text-brand-brown hover:text-brand-brown-dark"
                      >
                        breadnbrew512@gmail.com
                      </a>
                    </p>
                    <p>Follow us on social media</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
