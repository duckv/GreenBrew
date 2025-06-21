import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Truck, Store } from "lucide-react";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<
    "pickup" | "delivery" | null
  >(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const isFormValid = () => {
    if (!selectedOption) return false;
    if (!userInfo.name || !userInfo.phone || !userInfo.email) return false;
    if (selectedOption === "delivery" && !userInfo.address) return false;
    return true;
  };

  const handleContinue = () => {
    if (!isFormValid()) return;

    if (selectedOption === "delivery") {
      // Show delivery options instead of going to menu
      return;
    }

    // Store user info and navigate to menu
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("orderType", selectedOption);
    navigate("/menu");
    onClose();
  };

  const handleDeliveryService = (service: string) => {
    // Open external delivery service
    const urls = {
      ubereats: "https://ubereats.com",
      doordash: "https://doordash.com",
      grubhub: "https://grubhub.com",
    };

    window.open(urls[service as keyof typeof urls], "_blank");
    onClose();
  };

  if (selectedOption === "delivery" && userInfo.name) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center font-heading text-2xl text-brand-brown">
              Choose Delivery Service
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-6">
            <p className="text-center text-cafe-gray-600 mb-6">
              Select your preferred delivery service to place your order
            </p>

            <div className="space-y-3">
              <Button
                className="w-full h-16 bg-black hover:bg-gray-800 text-white font-semibold text-lg"
                onClick={() => handleDeliveryService("ubereats")}
              >
                <img
                  src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee005d5d91354a86.svg"
                  alt="Uber Eats"
                  className="h-6 mr-3"
                />
                Order on Uber Eats
              </Button>

              <Button
                className="w-full h-16 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg"
                onClick={() => handleDeliveryService("doordash")}
              >
                <span className="mr-3 text-xl">🏪</span>
                Order on DoorDash
              </Button>

              <Button
                className="w-full h-16 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-lg"
                onClick={() => handleDeliveryService("grubhub")}
              >
                <span className="mr-3 text-xl">🍽️</span>
                Order on Grubhub
              </Button>
            </div>

            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setSelectedOption(null)}
              >
                Back
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center font-heading text-2xl text-brand-brown">
            How would you like to get your order?
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-6">
          {/* Location Options */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={selectedOption === "pickup" ? "default" : "outline"}
              className={`h-20 flex-col space-y-2 ${
                selectedOption === "pickup"
                  ? "bg-brand-brown text-white"
                  : "border-brand-brown text-brand-brown hover:bg-brand-brown hover:text-white"
              }`}
              onClick={() => setSelectedOption("pickup")}
            >
              <Store className="w-6 h-6" />
              <span className="font-medium">Pickup</span>
            </Button>

            <Button
              variant={selectedOption === "delivery" ? "default" : "outline"}
              className={`h-20 flex-col space-y-2 ${
                selectedOption === "delivery"
                  ? "bg-brand-brown text-white"
                  : "border-brand-brown text-brand-brown hover:bg-brand-brown hover:text-white"
              }`}
              onClick={() => setSelectedOption("delivery")}
            >
              <Truck className="w-6 h-6" />
              <span className="font-medium">Delivery</span>
            </Button>
          </div>

          {/* User Information Form */}
          {selectedOption && (
            <div className="space-y-4 border-t pt-6">
              <h3 className="font-medium text-cafe-gray-900">
                Please provide your information:
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={userInfo.name}
                    onChange={(e) =>
                      setUserInfo((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={userInfo.phone}
                    onChange={(e) =>
                      setUserInfo((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="your@email.com"
                />
              </div>

              {selectedOption === "delivery" && (
                <div>
                  <Label htmlFor="address">Delivery Address *</Label>
                  <Input
                    id="address"
                    value={userInfo.address}
                    onChange={(e) =>
                      setUserInfo((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    placeholder="123 Main St, City, State"
                  />
                </div>
              )}
            </div>
          )}

          {/* Store Hours */}
          <div className="bg-cafe-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-cafe-gray-900 mb-2 flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-brand-brown" />
              Store Hours
            </h4>
            <div className="text-sm text-cafe-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>Monday - Saturday</span>
                <span>7:00 AM - 5:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>9:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="flex-1 btn-primary"
              onClick={handleContinue}
              disabled={!isFormValid()}
            >
              {selectedOption === "delivery" ? "Choose Service" : "View Menu"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
