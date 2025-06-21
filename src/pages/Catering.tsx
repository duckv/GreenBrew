import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Coffee, Pizza, Cake, Phone } from "lucide-react";

export default function Catering() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    guestCount: "",
    eventType: "",
    details: "",
  });

  const cateringOptions = [
    {
      icon: Coffee,
      title: "Coffee & Pastry Platters",
      description: "Perfect for morning meetings and office gatherings",
      items: [
        "Assorted pastries",
        "Fresh coffee service",
        "Seasonal fruit",
        "Bagels & spreads",
      ],
      minOrder: 10,
      priceRange: "$8-12 per person",
    },
    {
      icon: Pizza,
      title: "Lunch Catering",
      description: "Hearty options for corporate events and parties",
      items: [
        "Artisan pizza selection",
        "Fresh salads",
        "Sandwich platters",
        "Dessert options",
      ],
      minOrder: 15,
      priceRange: "$12-18 per person",
    },
    {
      icon: Cake,
      title: "Special Events",
      description: "Custom catering for weddings and celebrations",
      items: [
        "Custom menu planning",
        "Gelato bar",
        "Specialty desserts",
        "Full service options",
      ],
      minOrder: 25,
      priceRange: "Custom pricing",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      "Thank you for your catering inquiry! We'll contact you within 24 hours to discuss your event.",
    );
    setFormData({
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      guestCount: "",
      eventType: "",
      details: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-cafe-gray-50">
      <Header />

      <main className="section-padding">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-cafe-gray-900 mb-6">
              Catering Services
            </h1>
            <p className="text-lg text-cafe-gray-600 max-w-3xl mx-auto">
              Let Bread N' Br☕︎w cater your next event with our fresh artisan
              breads, premium coffee, and delicious pastries. We make every
              gathering special.
            </p>
          </div>

          {/* Catering Options */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {cateringOptions.map((option, index) => (
              <Card
                key={index}
                className="card-elevated hover:scale-105 transition-transform duration-300"
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-brand-brown rounded-full flex items-center justify-center mx-auto mb-4">
                    <option.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="font-heading text-xl">
                    {option.title}
                  </CardTitle>
                  <p className="text-cafe-gray-600 text-sm">
                    {option.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-cafe-gray-900 mb-2">
                      Includes:
                    </h4>
                    <ul className="space-y-1">
                      {option.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="text-sm text-cafe-gray-600 flex items-center"
                        >
                          <span className="w-1.5 h-1.5 bg-brand-brown rounded-full mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-cafe-gray-200">
                    <div>
                      <Badge variant="secondary" className="text-xs">
                        Min {option.minOrder} guests
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-brand-brown">
                        {option.priceRange}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Catering Form */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-brand-brown" />
                  <span>Request a Quote</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Contact Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="(908) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="eventDate">Event Date</Label>
                      <Input
                        id="eventDate"
                        name="eventDate"
                        type="date"
                        value={formData.eventDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="guestCount">Number of Guests</Label>
                      <Input
                        id="guestCount"
                        name="guestCount"
                        type="number"
                        value={formData.guestCount}
                        onChange={handleChange}
                        placeholder="50"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="eventType">Event Type</Label>
                    <Input
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      placeholder="Corporate meeting, wedding, birthday party, etc."
                    />
                  </div>

                  <div>
                    <Label htmlFor="details">
                      Event Details & Special Requests
                    </Label>
                    <Textarea
                      id="details"
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      placeholder="Tell us about your event, dietary restrictions, preferred menu items, setup requirements, etc."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full btn-primary">
                    Request Catering Quote
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Catering Info */}
            <div className="space-y-8">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-brand-brown" />
                    <span>How It Works</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-brand-brown rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-cafe-gray-900">
                        Submit Your Request
                      </h4>
                      <p className="text-sm text-cafe-gray-600">
                        Fill out our catering form with your event details
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-brand-brown rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-cafe-gray-900">
                        Custom Quote
                      </h4>
                      <p className="text-sm text-cafe-gray-600">
                        We'll create a personalized menu and pricing for your
                        event
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-brand-brown rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-cafe-gray-900">
                        Confirm & Deliver
                      </h4>
                      <p className="text-sm text-cafe-gray-600">
                        Approve the order and we'll handle the rest
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Catering Policies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-cafe-gray-600">
                  <div>
                    <strong>Minimum Order:</strong> 10 guests for coffee
                    service, 15 for lunch, 25 for special events
                  </div>
                  <div>
                    <strong>Lead Time:</strong> 48 hours minimum for most
                    orders, 1 week for events over 50 guests
                  </div>
                  <div>
                    <strong>Delivery:</strong> Available within 10 miles of
                    Berkeley Heights (fees apply)
                  </div>
                  <div>
                    <strong>Payment:</strong> 50% deposit required, balance due
                    on delivery
                  </div>
                  <div>
                    <strong>Cancellation:</strong> 24 hours notice required for
                    refund
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated bg-brand-brown text-white">
                <CardContent className="p-6 text-center">
                  <Phone className="w-8 h-8 mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-semibold mb-2">
                    Need Help Planning?
                  </h3>
                  <p className="mb-4 text-sm opacity-90">
                    Call us to discuss your catering needs
                  </p>
                  <a
                    href="tel:+19089330123"
                    className="inline-flex items-center bg-white text-brand-brown px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    (908) 933-0123
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
