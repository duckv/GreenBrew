import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Minus, Star, Search, ShoppingCart } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  isPopular?: boolean;
  allergens?: string[];
}

const menuItems: MenuItem[] = [
  // Gelato Section
  {
    id: "g1",
    name: "Pistachio Gelato",
    price: 6.5,
    description: "Authentic Sicilian pistachio gelato made with imported nuts",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "gelato",
    rating: 4.9,
    isPopular: true,
    allergens: ["nuts"],
  },
  {
    id: "g2",
    name: "Vanilla Bean",
    price: 4.95,
    description: "Premium Madagascar vanilla bean gelato",
    image:
      "https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "gelato",
    rating: 4.7,
  },
  {
    id: "g3",
    name: "Chocolate Fondente",
    price: 5.75,
    description: "Rich dark chocolate gelato with 70% cocoa",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "gelato",
    rating: 4.8,
  },
  {
    id: "g4",
    name: "Stracciatella",
    price: 5.25,
    description: "Creamy vanilla gelato with dark chocolate chips",
    image:
      "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "gelato",
    rating: 4.6,
    isPopular: true,
  },

  // Ice Cream Section
  {
    id: "i1",
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
    id: "i2",
    name: "Mint Chocolate Chip",
    price: 5.5,
    description: "Cool mint ice cream with dark chocolate chips",
    image:
      "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "ice-cream",
    rating: 4.5,
  },
  {
    id: "i3",
    name: "Cookies & Cream",
    price: 5.75,
    description: "Vanilla ice cream loaded with chocolate cookie pieces",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "ice-cream",
    rating: 4.7,
  },

  // Pastries Section
  {
    id: "p1",
    name: "Butter Croissant",
    price: 4.5,
    description: "Flaky, buttery croissant baked fresh daily",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "pastry",
    rating: 4.8,
  },
  {
    id: "p2",
    name: "Chocolate Éclair",
    price: 5.25,
    description: "Choux pastry filled with cream and topped with chocolate",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "pastry",
    rating: 4.7,
  },
  {
    id: "p3",
    name: "Almond Biscotti",
    price: 3.75,
    description: "Traditional Italian twice-baked almond cookies",
    image:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "pastry",
    rating: 4.6,
    allergens: ["nuts", "gluten"],
  },

  // Coffee Section
  {
    id: "c1",
    name: "Espresso",
    price: 3.25,
    description: "Rich, full-bodied espresso from our signature blend",
    image:
      "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "coffee",
    rating: 4.9,
  },
  {
    id: "c2",
    name: "Cappuccino",
    price: 4.75,
    description: "Perfect balance of espresso, steamed milk, and foam",
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "coffee",
    rating: 4.8,
    isPopular: true,
  },
  {
    id: "c3",
    name: "Caffe Latte",
    price: 5.25,
    description: "Smooth espresso with steamed milk and light foam",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "coffee",
    rating: 4.6,
  },
];

export default function Menu() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [cart, setCart] = useState<Array<{ item: MenuItem; quantity: number }>>(
    [],
  );
  const [userInfo, setUserInfo] = useState<any>(null);
  const [orderType, setOrderType] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has completed location selection
    const storedUserInfo = localStorage.getItem("userInfo");
    const storedOrderType = localStorage.getItem("orderType");

    if (!storedUserInfo || !storedOrderType) {
      // Redirect back to home if no user info
      navigate("/");
      return;
    }

    setUserInfo(JSON.parse(storedUserInfo));
    setOrderType(storedOrderType);
  }, [navigate]);

  const categories = [
    { id: "all", label: "All Items" },
    { id: "gelato", label: "Gelato" },
    { id: "ice-cream", label: "Ice Cream" },
    { id: "pastry", label: "Pastries" },
    { id: "coffee", label: "Coffee" },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesFilter =
      selectedFilter === "all" || item.category === selectedFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const updateQuantity = (itemId: string, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change),
    }));
  };

  const addToCart = (item: MenuItem) => {
    const quantity = quantities[item.id] || 1;
    setCart((prev) => {
      const existingItem = prev.find(
        (cartItem) => cartItem.item.id === item.id,
      );
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem,
        );
      }
      return [...prev, { item, quantity }];
    });
    setQuantities((prev) => ({ ...prev, [item.id]: 0 }));
  };

  const getTotalItems = () => {
    return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
      0,
    );
  };

  const proceedToCheckout = () => {
    // Store cart data and navigate to checkout
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/checkout");
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-cafe-gray-50">
      <Header />

      <main className="section-padding">
        <div className="container-custom">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-cafe-gray-900 mb-4">
              Complete Menu
            </h1>
            <p className="text-cafe-gray-600 mb-4">
              Order for {orderType} • {userInfo.name}
            </p>
            <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
              <p className="text-sm text-cafe-gray-600">
                Mon-Sat: 7:00 AM - 5:30 PM | Sun: 9:00 AM - 4:00 PM
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cafe-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Cart Summary for Mobile */}
              {getTotalItems() > 0 && (
                <div className="md:hidden">
                  <Button
                    className="btn-primary relative"
                    onClick={proceedToCheckout}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Checkout (${getTotalPrice().toFixed(2)})
                    <span className="absolute -top-2 -right-2 bg-brand-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  </Button>
                </div>
              )}
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedFilter === category.id ? "default" : "outline"
                  }
                  className={`px-6 py-2 rounded-full transition-all duration-200 ${
                    selectedFilter === category.id
                      ? "bg-brand-brown text-white shadow-lg"
                      : "border-brand-brown text-brand-brown hover:bg-brand-brown hover:text-white"
                  }`}
                  onClick={() => setSelectedFilter(category.id)}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

                  <p className="text-cafe-gray-600 mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  {item.allergens && (
                    <div className="mb-4">
                      <p className="text-xs text-cafe-gray-500 mb-1">
                        Contains:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {item.allergens.map((allergen) => (
                          <Badge
                            key={allergen}
                            variant="secondary"
                            className="text-xs"
                          >
                            {allergen}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

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

          {/* Fixed Cart Bar for Desktop */}
          {getTotalItems() > 0 && (
            <div className="hidden md:block fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-cafe-gray-200 z-40">
              <div className="container-custom py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <ShoppingCart className="w-5 h-5 text-brand-brown" />
                    <span className="font-medium text-cafe-gray-900">
                      {getTotalItems()} items in cart
                    </span>
                    <span className="text-sm text-cafe-gray-600">
                      Total: ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <Button className="btn-primary" onClick={proceedToCheckout}>
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
