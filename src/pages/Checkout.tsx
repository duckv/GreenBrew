import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationModal from "@/components/LocationModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CreditCard,
  Truck,
  Store,
  Clock,
  MapPin,
  Trash2,
  Plus,
  Minus,
  Edit,
} from "lucide-react";

interface CartItem {
  item: {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
  };
  quantity: number;
}

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [orderType, setOrderType] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [tipPercentage, setTipPercentage] = useState<number>(0);
  const [customTip, setCustomTip] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);

  useEffect(() => {
    // Load cart and user info
    const storedCart = localStorage.getItem("cart");
    const storedUserInfo = localStorage.getItem("userInfo");
    const storedOrderType = localStorage.getItem("orderType");

    if (!storedCart || !storedUserInfo || !storedOrderType) {
      navigate("/");
      return;
    }

    setCart(JSON.parse(storedCart));
    setUserInfo(JSON.parse(storedUserInfo));
    setOrderType(storedOrderType);
  }, [navigate]);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart((prev) => prev.filter((item) => item.item.id !== itemId));
    } else {
      setCart((prev) =>
        prev.map((cartItem) =>
          cartItem.item.id === itemId
            ? { ...cartItem, quantity: newQuantity }
            : cartItem,
        ),
      );
    }
  };

  const removeItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.item.id !== itemId));
  };

  const getSubtotal = () => {
    return cart.reduce(
      (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
      0,
    );
  };

  const getTax = () => {
    return getSubtotal() * 0.06625; // 6.625% tax
  };

  const getDeliveryFee = () => {
    return orderType === "delivery" ? 3.99 : 0;
  };

  const getTipAmount = () => {
    const subtotal = getSubtotal();
    if (tipPercentage > 0) {
      return subtotal * (tipPercentage / 100);
    }
    if (customTip) {
      return parseFloat(customTip) || 0;
    }
    return 0;
  };

  const getTotal = () => {
    return getSubtotal() + getTax() + getDeliveryFee() + getTipAmount();
  };

  const handlePlaceOrder = async () => {
    if (getSubtotal() > 150) {
      alert(
        "Orders over $150 must call the store at (908) 933-0123. We're sorry for the inconvenience!",
      );
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create order object
    const order = {
      id: Date.now().toString(),
      items: cart,
      userInfo,
      orderType,
      paymentMethod,
      specialInstructions,
      subtotal: getSubtotal(),
      tax: getTax(),
      deliveryFee: getDeliveryFee(),
      total: getTotal(),
      timestamp: new Date().toISOString(),
      status: "confirmed",
    };

    // Store order and clear cart
    localStorage.setItem("currentOrder", JSON.stringify(order));
    localStorage.removeItem("cart");

    setIsProcessing(false);

    // Navigate to order confirmation
    navigate("/order-confirmation");
  };

  if (!userInfo || cart.length === 0) {
    return (
      <div className="min-h-screen bg-cafe-gray-50">
        <Header />
        <main className="section-padding">
          <div className="container-custom text-center">
            <h1 className="font-heading text-3xl font-bold text-cafe-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-cafe-gray-600 mb-8">
              Add some delicious items to your cart to continue
            </p>
            <Button className="btn-primary" onClick={() => navigate("/")}>
              Back to Menu
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cafe-gray-50">
      <Header />

      <main className="section-padding">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-cafe-gray-900 mb-4">
              Checkout
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-cafe-gray-600">
                {orderType === "pickup" ? (
                  <div className="flex items-center space-x-2">
                    <Store className="w-4 h-4" />
                    <span>Pickup Order</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4" />
                    <span>Delivery Order</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Ready in 15-20 minutes</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLocationModal(true)}
                className="text-brand-brown border-brand-brown hover:bg-brand-brown hover:text-white"
              >
                <Edit className="w-3 h-3 mr-1" />
                Change
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-brand-brown" />
                    <span>Customer Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Name</Label>
                      <Input value={userInfo.name} readOnly />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input value={userInfo.phone} readOnly />
                    </div>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value={userInfo.email} readOnly />
                  </div>
                  {orderType === "delivery" && (
                    <div>
                      <Label>Delivery Address</Label>
                      <Input value={userInfo.address} readOnly />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-brand-brown" />
                    <span>Payment Method</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash">
                        {orderType === "pickup"
                          ? "Pay at Store"
                          : "Cash on Delivery"}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="apple-pay" id="apple-pay" />
                      <Label htmlFor="apple-pay">Apple Pay</Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="mt-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                        </div>
                        <div>
                          <Label htmlFor="card-name">Cardholder Name</Label>
                          <Input id="card-name" placeholder="John Doe" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" maxLength={3} />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Tipping Section */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Add Tip</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      {[15, 18, 23].map((percentage) => (
                        <Button
                          key={percentage}
                          variant={
                            tipPercentage === percentage ? "default" : "outline"
                          }
                          className={`${
                            tipPercentage === percentage
                              ? "bg-brand-brown text-white"
                              : "border-brand-brown text-brand-brown hover:bg-brand-brown hover:text-white"
                          }`}
                          onClick={() => {
                            setTipPercentage(percentage);
                            setCustomTip("");
                          }}
                        >
                          {percentage}%
                        </Button>
                      ))}
                    </div>
                    <div>
                      <Label htmlFor="custom-tip">Custom Tip ($)</Label>
                      <Input
                        id="custom-tip"
                        type="number"
                        placeholder="0.00"
                        value={customTip}
                        onChange={(e) => {
                          setCustomTip(e.target.value);
                          setTipPercentage(0);
                        }}
                      />
                    </div>
                    {getTipAmount() > 0 && (
                      <p className="text-sm text-cafe-gray-600">
                        Tip amount: ${getTipAmount().toFixed(2)}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Special Instructions */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Special Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Any special requests or notes for your order..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    rows={4}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cart.map((cartItem) => (
                    <div key={cartItem.item.id} className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <img
                          src={cartItem.item.image}
                          alt={cartItem.item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-cafe-gray-900 truncate">
                            {cartItem.item.name}
                          </h4>
                          <p className="text-sm text-cafe-gray-600">
                            ${cartItem.item.price.toFixed(2)} each
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-6 h-6 p-0 rounded-full"
                                onClick={() =>
                                  updateQuantity(
                                    cartItem.item.id,
                                    cartItem.quantity - 1,
                                  )
                                }
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-sm font-medium w-6 text-center">
                                {cartItem.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-6 h-6 p-0 rounded-full"
                                onClick={() =>
                                  updateQuantity(
                                    cartItem.item.id,
                                    cartItem.quantity + 1,
                                  )
                                }
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 p-1"
                              onClick={() => removeItem(cartItem.item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-medium text-cafe-gray-900">
                            $
                            {(cartItem.item.price * cartItem.quantity).toFixed(
                              2,
                            )}
                          </span>
                        </div>
                      </div>
                      <Separator />
                    </div>
                  ))}

                  <div className="space-y-2 pt-4">
                    <div className="flex justify-between text-cafe-gray-600">
                      <span>Subtotal</span>
                      <span>${getSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-cafe-gray-600">
                      <span>Tax</span>
                      <span>${getTax().toFixed(2)}</span>
                    </div>
                    {orderType === "delivery" && (
                      <div className="flex justify-between text-cafe-gray-600">
                        <span>Delivery Fee</span>
                        <span>${getDeliveryFee().toFixed(2)}</span>
                      </div>
                    )}
                    {getTipAmount() > 0 && (
                      <div className="flex justify-between text-cafe-gray-600">
                        <span>Tip</span>
                        <span>${getTipAmount().toFixed(2)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between text-lg font-bold text-cafe-gray-900">
                      <span>Total</span>
                      <span>${getTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  {getSubtotal() > 150 && (
                    <div className="text-center p-3 bg-red-50 border border-red-200 rounded-lg mt-4">
                      <p className="text-sm text-red-700 font-medium mb-2">
                        Orders over $150 must call the store
                      </p>
                      <a
                        href="tel:+19089330123"
                        className="text-sm text-red-600 hover:text-red-800 font-medium underline"
                      >
                        Call (908) 933-0123
                      </a>
                      <p className="text-xs text-red-600 mt-1">
                        We're sorry for the inconvenience!
                      </p>
                    </div>
                  )}

                  <Button
                    className="w-full btn-primary mt-6"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing || getSubtotal() > 150}
                  >
                    {isProcessing
                      ? "Processing..."
                      : `Place Order - $${getTotal().toFixed(2)}`}
                  </Button>

                  <div className="text-xs text-center text-cafe-gray-500 mt-4">
                    By placing this order, you agree to our terms of service
                  </div>
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
