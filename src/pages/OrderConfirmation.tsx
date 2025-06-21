import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Truck2,
  Store,
  Download,
} from "lucide-react";

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem("currentOrder");

    if (!storedOrder) {
      navigate("/");
      return;
    }

    setOrder(JSON.parse(storedOrder));
  }, [navigate]);

  const getEstimatedTime = () => {
    if (!order) return "";

    const orderTime = new Date(order.timestamp);
    const readyTime = new Date(orderTime.getTime() + 20 * 60000); // 20 minutes

    return readyTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const downloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    const receiptData = `
REZA'S CAFÉ - ORDER RECEIPT
Order #: ${order.id}
Date: ${new Date(order.timestamp).toLocaleString()}

Customer: ${order.userInfo.name}
Phone: ${order.userInfo.phone}
Email: ${order.userInfo.email}
${order.orderType === "delivery" ? `Address: ${order.userInfo.address}` : "Pickup Order"}

ITEMS ORDERED:
${order.items
  .map(
    (item: any) =>
      `${item.quantity}x ${item.item.name} - $${(item.item.price * item.quantity).toFixed(2)}`,
  )
  .join("\n")}

Subtotal: $${order.subtotal.toFixed(2)}
Tax: $${order.tax.toFixed(2)}
${order.orderType === "delivery" ? `Delivery Fee: $${order.deliveryFee.toFixed(2)}` : ""}
TOTAL: $${order.total.toFixed(2)}

Payment Method: ${order.paymentMethod}
${order.specialInstructions ? `Special Instructions: ${order.specialInstructions}` : ""}

Thank you for your order!
    `;

    const blob = new Blob([receiptData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${order.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-cafe-gray-50">
      <Header />

      <main className="section-padding">
        <div className="container-custom max-w-3xl">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-cafe-gray-900 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-lg text-cafe-gray-600 mb-2">
              Thank you for your order, {order.userInfo.name}
            </p>
            <p className="text-cafe-gray-500">
              Order #{order.id} has been received and is being prepared
            </p>
          </div>

          {/* Order Status */}
          <Card className="card-elevated mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-brand-brown" />
                <span>Order Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {order.orderType === "pickup" ? (
                    <Store className="w-6 h-6 text-blue-600" />
                  ) : (
                    <Truck2 className="w-6 h-6 text-blue-600" />
                  )}
                  <div>
                    <p className="font-medium text-blue-900">
                      {order.orderType === "pickup"
                        ? "Preparing for Pickup"
                        : "Preparing for Delivery"}
                    </p>
                    <p className="text-sm text-blue-700">
                      Estimated ready time: {getEstimatedTime()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                </div>
              </div>

              {order.orderType === "pickup" && (
                <div className="mt-4 p-4 bg-cafe-gray-50 rounded-lg">
                  <h4 className="font-medium text-cafe-gray-900 mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Pickup Location
                  </h4>
                  <p className="text-cafe-gray-700">
                    Reza's Café
                    <br />
                    123 Main Street, Downtown
                    <br />
                    City, State 12345
                  </p>
                  <div className="mt-3 space-y-1">
                    <p className="text-sm text-cafe-gray-600">
                      <Phone className="w-4 h-4 inline mr-1" />
                      (123) 456-7890
                    </p>
                    <p className="text-sm text-cafe-gray-600">
                      Mon-Sat: 7:00 AM - 5:30 PM | Sun: 9:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card className="card-elevated mb-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((cartItem: any) => (
                <div
                  key={cartItem.item.id}
                  className="flex items-center space-x-4"
                >
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-cafe-gray-900">
                      {cartItem.item.name}
                    </h4>
                    <p className="text-sm text-cafe-gray-600">
                      ${cartItem.item.price.toFixed(2)} × {cartItem.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-cafe-gray-900">
                      ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-cafe-gray-600">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-cafe-gray-600">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                {order.orderType === "delivery" && (
                  <div className="flex justify-between text-cafe-gray-600">
                    <span>Delivery Fee</span>
                    <span>${order.deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold text-cafe-gray-900">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>

              {order.specialInstructions && (
                <div className="mt-4 p-3 bg-cafe-gray-50 rounded-lg">
                  <h4 className="font-medium text-cafe-gray-900 mb-1">
                    Special Instructions
                  </h4>
                  <p className="text-sm text-cafe-gray-700">
                    {order.specialInstructions}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact & Actions */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-cafe-gray-50 rounded-lg">
                  <Phone className="w-6 h-6 text-brand-brown mx-auto mb-2" />
                  <p className="font-medium text-cafe-gray-900">Call Us</p>
                  <a
                    href="tel:+1234567890"
                    className="text-brand-brown hover:text-brand-brown-dark"
                  >
                    (123) 456-7890
                  </a>
                </div>
                <div className="text-center p-4 bg-cafe-gray-50 rounded-lg">
                  <Mail className="w-6 h-6 text-brand-brown mx-auto mb-2" />
                  <p className="font-medium text-cafe-gray-900">Email Us</p>
                  <a
                    href="mailto:orders@rezascafe.com"
                    className="text-brand-brown hover:text-brand-brown-dark"
                  >
                    orders@rezascafe.com
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={downloadReceipt}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Receipt
                </Button>
                <Button
                  className="flex-1 btn-primary"
                  onClick={() => navigate("/")}
                >
                  Order Again
                </Button>
              </div>

              <p className="text-xs text-center text-cafe-gray-500 mt-4">
                You will receive an email confirmation and updates about your
                order.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
