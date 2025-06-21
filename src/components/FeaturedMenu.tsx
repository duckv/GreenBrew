import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import LocationModal from "./LocationModal";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: "gelato" | "ice-cream" | "pastry" | "coffee";
  isPopular?: boolean;
}

interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

const featuredItems: MenuItem[] = [
  {
    id: "1",
    name: "Pistachio Gelato",
    price: 6.5,
    description: "Authentic Sicilian pistachio gelato made with imported nuts",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "gelato",
    isPopular: true,
  },
  {
    id: "2",
    name: "Chocolate Hazelnut",
    price: 5.75,
    description: "Rich chocolate ice cream with roasted hazelnuts",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "ice-cream",
  },
  {
    id: "3",
    name: "Vanilla Bean",
    price: 4.95,
    description: "Premium Madagascar vanilla bean gelato",
    image:
      "https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "gelato",
  },
  {
    id: "4",
    name: "Strawberry Cheesecake",
    price: 6.25,
    description: "Creamy cheesecake ice cream with fresh strawberry swirl",
    image:
      "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "ice-cream",
    isPopular: true,
  },
  {
    id: "5",
    name: "Butter Croissant",
    price: 4.5,
    description: "Flaky, buttery croissant baked fresh daily",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "pastry",
  },
  {
    id: "6",
    name: "Espresso",
    price: 3.25,
    description: "Rich, full-bodied espresso from our signature blend",
    image:
      "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "coffee",
  },
];

// Customization options for featured items
const customizationOptions: CustomizationOption[] = [
  { id: "nothing", name: "Nothing", price: 0 },
  { id: "extra-shot", name: "Extra Shot", price: 1.5 },
  { id: "decaf", name: "Make it Decaf", price: 0 },
  { id: "extra-hot", name: "Extra Hot", price: 0 },
  { id: "extra-foam", name: "Extra Foam", price: 0 },
  { id: "oat-milk", name: "Oat Milk", price: 0.75 },
  { id: "almond-milk", name: "Almond Milk", price: 0.5 },
  { id: "soy-milk", name: "Soy Milk", price: 0.5 },
  { id: "coconut-milk", name: "Coconut Milk", price: 0.5 },
  { id: "vanilla-syrup", name: "Vanilla Syrup", price: 0.5 },
  { id: "caramel-syrup", name: "Caramel Syrup", price: 0.5 },
  { id: "hazelnut-syrup", name: "Hazelnut Syrup", price: 0.5 },
  { id: "extra-topping", name: "Extra Toppings", price: 1.0 },
  { id: "whipped-cream", name: "Whipped Cream", price: 0.5 },
];

interface FeaturedItemCardProps {
  item: MenuItem;
  quantity: number;
  onUpdateQuantity: (itemId: string, change: number) => void;
  onAddToCart: (item: MenuItem) => void;
}

function FeaturedItemCard({
  item,
  quantity,
  onUpdateQuantity,
  onAddToCart,
}: FeaturedItemCardProps) {
  const [selectedCustomizations, setSelectedCustomizations] = useState<
    string[]
  >([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCustomizationChange = (optionId: string, checked: boolean) => {
    setSelectedCustomizations((prev) => {
      if (checked) {
        return [...prev, optionId];
      } else {
        return prev.filter((id) => id !== optionId);
      }
    });
  };

  const getTotalCustomizationPrice = () => {
    return selectedCustomizations.reduce((total, optionId) => {
      const option = customizationOptions.find((opt) => opt.id === optionId);
      return total + (option?.price || 0);
    }, 0);
  };

  const getSelectedCustomizationNames = () => {
    return selectedCustomizations
      .map((optionId) => {
        const option = customizationOptions.find((opt) => opt.id === optionId);
        return option?.name;
      })
      .filter(Boolean)
      .join(", ");
  };

  return (
    <Card className="card-elevated group hover:scale-105 transition-all duration-300">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {item.isPopular && (
          <Badge className="absolute top-3 left-3 bg-brand-pink text-white">
            Popular
          </Badge>
        )}
      </div>

      <CardContent className="p-4 md:p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-heading text-lg md:text-xl font-semibold text-cafe-gray-900">
            {item.name}
          </h3>
          <span className="text-lg font-bold text-brand-brown">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <p className="text-cafe-gray-600 mb-4 text-sm md:text-base line-clamp-2">
          {item.description}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Button
            variant="outline"
            size="sm"
            className="w-8 h-8 p-0 rounded-full"
            onClick={() => onUpdateQuantity(item.id, -1)}
            disabled={quantity === 1}
          >
            <Minus className="w-3 h-3" />
          </Button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="sm"
            className="w-8 h-8 p-0 rounded-full"
            onClick={() => onUpdateQuantity(item.id, 1)}
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full border-brand-brown text-brand-brown hover:bg-brand-brown hover:text-white"
              >
                Customize
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle asChild>
                  <h2 className="text-xl font-semibold">
                    Customize {item.name}
                  </h2>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {customizationOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={`${item.id}-${option.id}`}
                      checked={selectedCustomizations.includes(option.id)}
                      onCheckedChange={(checked) =>
                        handleCustomizationChange(option.id, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`${item.id}-${option.id}`}
                      className="flex-1 flex justify-between items-center cursor-pointer"
                    >
                      <span>{option.name}</span>
                      <span className="text-brand-brown font-medium">
                        {option.price === 0
                          ? "+$0.00"
                          : `+$${option.price.toFixed(2)}`}
                      </span>
                    </Label>
                  </div>
                ))}
              </div>

              {selectedCustomizations.length > 0 && (
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-sm">
                    <span>Selected: {getSelectedCustomizationNames()}</span>
                    <span className="font-medium text-brand-brown">
                      +${getTotalCustomizationPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              <Button
                onClick={() => setIsDialogOpen(false)}
                className="w-full bg-brand-brown hover:bg-brand-brown/90 text-white"
              >
                Apply Customizations
              </Button>
            </DialogContent>
          </Dialog>

          <Button
            className="w-full bg-brand-brown hover:bg-brand-brown/90 text-white"
            onClick={() => onAddToCart(item)}
          >
            Add to Cart
            {getTotalCustomizationPrice() > 0 && (
              <span className="ml-2">
                (+${getTotalCustomizationPrice().toFixed(2)})
              </span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function FeaturedMenu() {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [showLocationModal, setShowLocationModal] = useState(false);

  // Show only first 4 featured items
  const displayItems = featuredItems.slice(0, 4);

  const updateQuantity = (itemId: string, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + change),
    }));
  };

  const handleAddToCart = (item: MenuItem) => {
    const quantity = quantities[item.id] || 1;
    addToCart(item, quantity);
    setQuantities((prev) => ({ ...prev, [item.id]: 1 }));
  };

  return (
    <section id="menu-section" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-cafe-gray-900 mb-4">
            Featured Menu
          </h2>
          <p className="text-lg text-cafe-gray-600 max-w-2xl mx-auto">
            Discover our most popular items, crafted with passion and the finest
            ingredients
          </p>
        </div>

        {/* Featured Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12">
          {displayItems.map((item) => (
            <FeaturedItemCard
              key={item.id}
              item={item}
              quantity={quantities[item.id] || 1}
              onUpdateQuantity={updateQuantity}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* View Full Menu CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="btn-primary text-lg px-8 py-4"
            onClick={() => setShowLocationModal(true)}
          >
            View Our Full Menu
          </Button>
          <p className="text-sm text-cafe-gray-600 mt-3">
            Choose your location to see complete menu and place orders
          </p>
        </div>
      </div>

      {/* Location Modal */}
      {showLocationModal && (
        <LocationModal onClose={() => setShowLocationModal(false)} />
      )}
    </section>
  );
}
