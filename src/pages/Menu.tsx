import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCart from "@/components/FloatingCart";
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
  category:
    | "gelato"
    | "ice-cream"
    | "coffee"
    | "tea"
    | "breads"
    | "breakfast"
    | "lunch"
    | "pizza"
    | "sweets"
    | "seasonal";
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

  // Tea Section
  {
    id: "t1",
    name: "Earl Grey",
    price: 2.75,
    description: "Classic black tea with bergamot oil",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "tea",
    rating: 4.5,
  },
  {
    id: "t2",
    name: "Chamomile",
    price: 2.95,
    description: "Soothing herbal tea with honey notes",
    image:
      "https://images.unsplash.com/photo-1597318045520-7d36f2b7fcbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "tea",
    rating: 4.4,
  },

  // Breads Section
  {
    id: "b1",
    name: "Sourdough Loaf",
    price: 8.5,
    description: "Artisan sourdough bread baked fresh daily",
    image:
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "breads",
    rating: 4.8,
    isPopular: true,
  },
  {
    id: "b2",
    name: "Focaccia",
    price: 6.75,
    description: "Italian flatbread with herbs and olive oil",
    image:
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "breads",
    rating: 4.7,
  },

  // Breakfast Section
  {
    id: "br1",
    name: "Avocado Toast",
    price: 12.95,
    description: "Smashed avocado on sourdough with everything seasoning",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "breakfast",
    rating: 4.6,
    isPopular: true,
  },
  {
    id: "br2",
    name: "Breakfast Sandwich",
    price: 9.95,
    description: "Egg, cheese, and bacon on toasted brioche",
    image:
      "https://images.unsplash.com/photo-1582196016295-f8c8bd4b3a99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "breakfast",
    rating: 4.7,
  },

  // Lunch Section
  {
    id: "l1",
    name: "Turkey Club",
    price: 14.95,
    description: "Roasted turkey, bacon, lettuce, tomato on sourdough",
    image:
      "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "lunch",
    rating: 4.8,
  },
  {
    id: "l2",
    name: "Caesar Salad",
    price: 11.95,
    description: "Crisp romaine, parmesan, croutons, caesar dressing",
    image:
      "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "lunch",
    rating: 4.5,
  },

  // Pizza Section
  {
    id: "p1",
    name: "Margherita Pizza",
    price: 16.95,
    description: "Fresh mozzarella, tomato sauce, basil",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "pizza",
    rating: 4.9,
    isPopular: true,
  },
  {
    id: "p2",
    name: "Pepperoni Pizza",
    price: 18.95,
    description: "Classic pepperoni with mozzarella and tomato sauce",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "pizza",
    rating: 4.7,
  },

  // Sweets Section
  {
    id: "s1",
    name: "Chocolate Brownie",
    price: 5.95,
    description: "Rich chocolate brownie with walnuts",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "sweets",
    rating: 4.8,
    allergens: ["nuts"],
  },
  {
    id: "s2",
    name: "Tiramisu",
    price: 7.95,
    description: "Classic Italian coffee-flavored dessert",
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "sweets",
    rating: 4.9,
    isPopular: true,
  },

  // Seasonal Section
  {
    id: "se1",
    name: "Pumpkin Spice Latte",
    price: 5.95,
    description: "Seasonal favorite with pumpkin and warming spices",
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "seasonal",
    rating: 4.6,
    isPopular: true,
  },
  {
    id: "se2",
    name: "Apple Cider Donut",
    price: 3.95,
    description: "Fall spiced donut with cinnamon sugar",
    image:
      "https://images.unsplash.com/photo-1514517604298-cf80e0fb7d4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "seasonal",
    rating: 4.5,
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

    // Load existing cart if any
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [navigate]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const categories = [
    { id: "all", label: "All Items" },
    { id: "gelato", label: "Gelato" },
    { id: "ice-cream", label: "Ice Cream" },
    { id: "coffee", label: "Coffee" },
    { id: "tea", label: "Tea" },
    { id: "breads", label: "Breads" },
    { id: "breakfast", label: "Breakfast" },
    { id: "lunch", label: "Lunch" },
    { id: "pizza", label: "Pizza" },
    { id: "sweets", label: "Sweets" },
    { id: "seasonal", label: "Seasonal" },
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
      [itemId]: Math.max(1, (prev[itemId] || 1) + change),
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
    setQuantities((prev) => ({ ...prev, [item.id]: 1 }));
  };

  const updateCartQuantity = (itemId: string, newQuantity: number) => {
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

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.item.id !== itemId));
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

  // Group items by category for display
  const groupedItems = categories.slice(1).reduce(
    (acc, category) => {
      const categoryItems = filteredItems.filter(
        (item) => item.category === category.id,
      );
      if (categoryItems.length > 0) {
        acc[category.id] = { label: category.label, items: categoryItems };
      }
      return acc;
    },
    {} as Record<string, { label: string; items: MenuItem[] }>,
  );

  return (
    <div className="min-h-screen bg-cafe-gray-50">
      <Header />

      <main className="py-8 px-4 sm:px-6 lg:px-8">
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
                  className={`px-4 md:px-6 py-2 rounded-full transition-all duration-200 text-sm md:text-base ${
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

          {/* Menu Items */}
          {selectedFilter === "all" ? (
            // Show grouped by category
            <div className="space-y-12">
              {Object.entries(groupedItems).map(
                ([categoryId, categoryData]) => (
                  <div key={categoryId}>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-cafe-gray-900 mb-6 text-center">
                      {categoryData.label}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryData.items.map((item) => (
                        <MenuItemCard
                          key={item.id}
                          item={item}
                          quantity={quantities[item.id] || 1}
                          onUpdateQuantity={updateQuantity}
                          onAddToCart={addToCart}
                        />
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          ) : (
            // Show filtered items
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  quantity={quantities[item.id] || 1}
                  onUpdateQuantity={updateQuantity}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}

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

      <div className="pb-20 md:pb-0">
        <Footer />
      </div>

      <FloatingCart
        cart={cart}
        updateQuantity={updateCartQuantity}
        removeItem={removeFromCart}
        onCheckout={proceedToCheckout}
      />
    </div>
  );
}

// Menu Item Card Component
interface MenuItemCardProps {
  item: MenuItem;
  quantity: number;
  onUpdateQuantity: (itemId: string, change: number) => void;
  onAddToCart: (item: MenuItem) => void;
}

function MenuItemCard({
  item,
  quantity,
  onUpdateQuantity,
  onAddToCart,
}: MenuItemCardProps) {
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
        <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{item.rating}</span>
        </div>
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

        <p className="text-cafe-gray-600 mb-3 text-sm md:text-base line-clamp-2">
          {item.description}
        </p>

        {item.allergens && (
          <div className="mb-4">
            <p className="text-xs text-cafe-gray-500 mb-1">Contains:</p>
            <div className="flex flex-wrap gap-1">
              {item.allergens.map((allergen) => (
                <Badge key={allergen} variant="secondary" className="text-xs">
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

          <Button
            className="btn-primary text-sm"
            size="sm"
            onClick={() => onAddToCart(item)}
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
