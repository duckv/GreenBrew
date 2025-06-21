/**
 * Contact page component
 * Contact form, store information, and location details
 */
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

/**
 * Contact page component with form and store information
 * @returns {JSX.Element} Complete contact page
 */
export default function Contact() {
  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handles form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  /**
   * Handles form input changes
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
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
              Contact Us
            </h1>
            <p className="text-lg text-cafe-gray-600 max-w-2xl mx-auto">
              We'd love to hear from you! Whether you have a question, feedback,
              or just want to say hello, we're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              {/* Store Location Card */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-brand-brown" />
                    <span>Visit Our Store</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium text-cafe-gray-900 mb-2">
                      Address
                    </h3>
                    <a
                      href="https://maps.google.com/maps?q=512+Springfield+Ave+Berkeley+Heights+NJ+07922"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cafe-gray-600 hover:text-brand-brown transition-colors"
                    >
                      512 Springfield Ave
                      <br />
                      Berkeley Heights, NJ 07922
                    </a>
                  </div>
                  <div>
                    <h3 className="font-medium text-cafe-gray-900 mb-2">
                      Directions
                    </h3>
                    <p className="text-cafe-gray-600 text-sm">
                      Located on Springfield Ave, just minutes from downtown
                      Berkeley Heights. Street parking available.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Methods Card */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-brand-brown" />
                    <span>Call or Email</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium text-cafe-gray-900 mb-2">
                      Phone
                    </h3>
                    <a
                      href="tel:+19089330123"
                      className="text-cafe-gray-600 hover:text-brand-brown transition-colors text-lg"
                    >
                      (908) 933-0123
                    </a>
                  </div>
                  <div>
                    <h3 className="font-medium text-cafe-gray-900 mb-2">
                      Email
                    </h3>
                    <a
                      href="mailto:breadnbrew512@gmail.com"
                      className="text-cafe-gray-600 hover:text-brand-brown transition-colors"
                    >
                      breadnbrew512@gmail.com
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Store Hours Card */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-brand-brown" />
                    <span>Store Hours</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-cafe-gray-600">
                        Monday - Saturday
                      </span>
                      <span className="font-medium text-cafe-gray-900">
                        7:00 AM - 5:30 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cafe-gray-600">Sunday</span>
                      <span className="font-medium text-cafe-gray-900">
                        9:00 AM - 4:00 PM
                      </span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-cafe-gray-200">
                      <span className="inline-flex items-center text-sm text-green-600">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Open Now
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-brand-brown" />
                  <span>Send Us a Message</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
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
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
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

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us how we can help..."
                      rows={6}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Map Section */}
          <Card className="card-elevated mt-12">
            <CardContent className="p-0">
              <div className="aspect-video bg-gradient-to-br from-cafe-gray-200 to-cafe-gray-300 rounded-lg relative overflow-hidden">
                {/* Placeholder for Google Maps */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-brand-brown mx-auto mb-4" />
                    <h3 className="font-heading text-xl font-semibold text-cafe-gray-900 mb-2">
                      Interactive Map
                    </h3>
                    <p className="text-cafe-gray-600 mb-4">
                      512 Springfield Ave, Berkeley Heights, NJ 07922
                    </p>
                    <a
                      href="https://maps.google.com/maps?q=512+Springfield+Ave+Berkeley+Heights+NJ+07922"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center px-6 py-3 rounded-full bg-brand-brown text-white hover:bg-brand-brown-dark transition-colors"
                    >
                      Get Directions
                    </a>
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
