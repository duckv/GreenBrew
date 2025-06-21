import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Star } from "lucide-react";
import LocationModal from "./LocationModal";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: "gelato" | "ice-cream" | "pastry" | "coffee";
  rating: number;
  isPopular?: boolean;
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
    rating: 4.9,
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
    rating: 4.8,
  },
  {
    id: "3",
    name: "Vanilla Bean",
    price: 4.95,
    description: "Premium Madagascar vanilla bean gelato",
    image:
      "https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "gelato",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Strawberry Cheesecake",
    price: 6.25,
    description: "Creamy cheesecake ice cream with fresh strawberry swirl",
    image:
      "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "ice-cream",
    rating: 4.6,
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
    rating: 4.8,
  },
  {
    id: "6",
    name: "Espresso",
    price: 3.25,
    description: "Rich, full-bodied espresso from our signature blend",
    image:
      "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "coffee",
    rating: 4.9,
  },
];

export default function FeaturedMenu() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [showLocationModal, setShowLocationModal] = useState(false);

  const filters = [
    { id: "all", label: "All Items" },
    { id: "gelato", label: "Gelato" },
    { id: "ice-cream", label: "Ice Cream" },
    { id: "pastry", label: "Pastries" },
    { id: "coffee", label: "Coffee" },
  ];

  const filteredItems =
    selectedFilter === "all"
      ? featuredItems
      : featuredItems.filter((item) => item.category === selectedFilter);

  const updateQuantity = (itemId: string, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change),
    }));
  };

  const addToCart = (item: MenuItem) => {
    const quantity = quantities[item.id] || 1;
    // Cart functionality will be implemented
    console.log(`Added ${quantity}x ${item.name} to cart`);
    setQuantities((prev) => ({ ...prev, [item.id]: 0 }));
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

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              className={`px-6 py-2 rounded-full transition-all duration-200 ${
                selectedFilter === filter.id
                  ? "bg-brand-brown text-white shadow-lg"
                  : "border-brand-brown text-brand-brown hover:bg-brand-brown hover:text-white"
              }`}
              onClick={() => setSelectedFilter(filter.id)}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Featured Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="card-elevated group hover:scale-105 transition-all duration-300"
            >
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
                <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{item.rating}</span>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-heading text-xl font-semibold text-cafe-gray-900">
                    {item.name}
                  </h3>
                  <span className="text-lg font-bold text-brand-brown">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                <p className="text-cafe-gray-600 mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0 rounded-full"
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={(quantities[item.id] || 0) === 0}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {quantities[item.id] || 0}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0 rounded-full"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>

                  <Button
                    className="btn-primary"
                    size="sm"
                    onClick={() => addToCart(item)}
                    disabled={(quantities[item.id] || 0) === 0}
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
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

      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
      />
    </section>
  );
}
