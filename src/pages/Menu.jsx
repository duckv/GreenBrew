/**
 * Menu page component
 * Complete restaurant menu with filtering, search, and cart functionality
 */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Plus, Minus, Search } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

// Menu items data structure with all categories
const menuItems = [
  // Pastries Section
  {
    id: "pt1",
    name: "Butter Croissant",
    price: 4.5,
    description: "Flaky, buttery croissant baked fresh daily",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "pastry",
    isPopular: true,
    allergens: ["gluten", "dairy", "eggs"],
  },
  {
    id: "pt2",
    name: "Almond Croissant",
    price: 5.25,
    description: "Buttery croissant filled with almond cream",
    image:
      "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "pastry",
    allergens: ["gluten", "dairy", "eggs", "nuts"],
  },
  {
    id: "pt3",
    name: "Danish Pastry",
    price: 4.75,
    description: "Sweet pastry with seasonal fruit filling",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "pastry",
    allergens: ["gluten", "dairy", "eggs"],
  },

  // Gelato Section
  {
    id: "g1",
    name: "Pistachio Gelato",
    price: 6.5,
    description: "Authentic Sicilian pistachio gelato made with imported nuts",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "gelato",
    isPopular: true,
    allergens: ["nuts", "dairy"],
  },
  {
    id: "g2",
    name: "Vanilla Bean",
    price: 4.95,
    description: "Premium Madagascar vanilla bean gelato",
    image:
      "https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "gelato",
    allergens: ["dairy"],
  },
  {
    id: "g3",
    name: "Chocolate Fondente",
    price: 5.75,
    description: "Rich dark chocolate gelato with 70% cocoa",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "gelato",
    allergens: ["dairy"],
  },
  {
    id: "g4",
    name: "Stracciatella",
    price: 5.25,
    description: "Creamy vanilla gelato with dark chocolate chips",
    image:
      "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "gelato",
    isPopular: true,
    allergens: ["dairy"],
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
    isPopular: true,
    allergens: ["dairy", "eggs"],
  },
  {
    id: "i2",
    name: "Mint Chocolate Chip",
    price: 5.5,
    description: "Cool mint ice cream with dark chocolate chips",
    image:
      "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "ice-cream",
    allergens: ["dairy"],
  },
  {
    id: "i3",
    name: "Cookies & Cream",
    price: 5.75,
    description: "Vanilla ice cream loaded with chocolate cookie pieces",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "ice-cream",
    allergens: ["dairy", "gluten"],
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
    allergens: [],
  },
  {
    id: "c2",
    name: "Cappuccino",
    price: 4.75,
    description: "Perfect balance of espresso, steamed milk, and foam",
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "coffee",
    isPopular: true,
    allergens: ["dairy"],
  },
  {
    id: "c3",
    name: "Caffe Latte",
    price: 5.25,
    description: "Smooth espresso with steamed milk and light foam",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "coffee",
    allergens: ["dairy"],
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
    allergens: ["nuts", "gluten", "dairy", "eggs"],
  },
  {
    id: "s2",
    name: "Tiramisu",
    price: 7.95,
    description: "Classic Italian coffee-flavored dessert",
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "sweets",
    isPopular: true,
    allergens: ["dairy", "eggs", "gluten"],
  },
  {
    id: "s3",
    name: "Cannoli",
    price: 4.95,
    description: "Crispy shell filled with sweet ricotta cream",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "sweets",
    allergens: ["dairy", "gluten", "eggs"],
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
    allergens: [],
  },
  {
    id: "t2",
    name: "Chamomile",
    price: 2.95,
    description: "Soothing herbal tea with honey notes",
    image:
      "https://images.unsplash.com/photo-1597318045520-7d36f2b7fcbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "tea",
    allergens: [],
  },

  // Additional items... (abbreviated for space)
];

// Category-specific customization options
const customizationOptionsByCategory = {
  coffee: [
    { id: "nothing", name: "Nothing", price: 0 },
    { id: "extra-shot", name: "Extra Shot", price: 1.5 },
    { id: "decaf", name: "Make it Decaf", price: 0 },
    { id: "extra-hot", name: "Extra Hot", price: 0 },
    { id: "oat-milk", name: "Oat Milk", price: 0.75 },
    { id: "almond-milk", name: "Almond Milk", price: 0.5 },
    { id: "vanilla-syrup", name: "Vanilla Syrup", price: 0.5 },
    { id: "whipped-cream", name: "Whipped Cream", price: 0.5 },
  ],
  tea: [
    { id: "nothing", name: "Nothing", price: 0 },
    { id: "honey", name: "Honey", price: 0.25 },
    { id: "lemon", name: "Lemon", price: 0.25 },
    { id: "extra-hot", name: "Extra Hot", price: 0 },
  ],
  pastry: [
    { id: "nothing", name: "Nothing", price: 0 },
    { id: "heated", name: "Heat It Up", price: 0 },
    { id: "butter", name: "Extra Butter", price: 0.5 },
    { id: "jam", name: "Jam on Side", price: 0.75 },
  ],
  gelato: [
    { id: "nothing", name: "Nothing", price: 0 },
    { id: "extra-scoop", name: "Extra Scoop", price: 3.0 },
    { id: "cone-upgrade", name: "Waffle Cone", price: 1.5 },
    { id: "whipped-cream", name: "Whipped Cream", price: 0.5 },
  ],
  "ice-cream": [
    { id: "nothing", name: "Nothing", price: 0 },
    { id: "extra-scoop", name: "Extra Scoop", price: 3.0 },
    { id: "cone-upgrade", name: "Waffle Cone", price: 1.5 },
    { id: "hot-fudge", name: "Hot Fudge", price: 1.0 },
    { id: "whipped-cream", name: "Whipped Cream", price: 0.5 },
  ],
  sweets: [
    { id: "nothing", name: "Nothing", price: 0 },
    { id: "heated", name: "Heat It Up", price: 0 },
    { id: "ice-cream-side", name: "Side of Ice Cream", price: 3.0 },
    { id: "whipped-cream", name: "Whipped Cream", price: 0.5 },
  ],
};

/**
 * Menu page component with filtering and cart functionality
 * @returns {JSX.Element} Complete menu page
 */
export default function Menu() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});
  const [userInfo, setUserInfo] = useState(null);
  const [orderType, setOrderType] = useState(null);

  // Check user authentication and location setup
  useEffect(() => {
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

  // Menu categories configuration
  const categories = [
    { id: "all", label: "All Items" },
    { id: "pastry", label: "Pastries" },
    { id: "coffee", label: "Coffee" },
    { id: "sweets", label: "Sweets" },
    { id: "tea", label: "Tea" },
    { id: "gelato", label: "Gelato" },
    { id: "ice-cream", label: "Ice Cream" },
  ];

  // Filter menu items based on category and search term
  const filteredItems = menuItems.filter((item) => {
    const matchesFilter =
      selectedFilter === "all" || item.category === selectedFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  /**
   * Updates quantity for a specific menu item
   * @param {string} itemId - Item ID
   * @param {number} change - Quantity change (+1 or -1)
   */
  const updateQuantity = (itemId, change) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + change),
    }));
  };

  /**
   * Adds item to cart with current quantity
   * @param {Object} item - Menu item object
   */
  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    addToCart(item, quantity);
    setQuantities((prev) => ({ ...prev, [item.id]: 1 }));
  };

  // Show loading if user info not loaded
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  // Group items by category for display
  const groupedItems = categories.slice(1).reduce((acc, category) => {
    const categoryItems = filteredItems.filter(
      (item) => item.category === category.id,
    );
    if (categoryItems.length > 0) {
      acc[category.id] = { label: category.label, items: categoryItems };
    }
    return acc;
  }, {});

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
                          onAddToCart={handleAddToCart}
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
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

/**
 * Individual menu item card component
 * @param {Object} props - Component props
 * @param {Object} props.item - Menu item data
 * @param {number} props.quantity - Current quantity
 * @param {Function} props.onUpdateQuantity - Quantity update handler
 * @param {Function} props.onAddToCart - Add to cart handler
 * @returns {JSX.Element} Menu item card
 */
function MenuItemCard({ item, quantity, onUpdateQuantity, onAddToCart }) {
  const [selectedCustomizations, setSelectedCustomizations] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Get customization options for this item's category
  const itemCustomizationOptions =
    customizationOptionsByCategory[item.category] ||
    customizationOptionsByCategory["coffee"];

  /**
   * Handles customization option changes
   * @param {string} optionId - Option ID
   * @param {boolean} checked - Whether option is checked
   */
  const handleCustomizationChange = (optionId, checked) => {
    setSelectedCustomizations((prev) => {
      if (checked) {
        return [...prev, optionId];
      } else {
        return prev.filter((id) => id !== optionId);
      }
    });
  };

  /**
   * Calculates total price for selected customizations
   * @returns {number} Total customization price
   */
  const getTotalCustomizationPrice = () => {
    return selectedCustomizations.reduce((total, optionId) => {
      const option = itemCustomizationOptions.find(
        (opt) => opt.id === optionId,
      );
      return total + (option?.price || 0);
    }, 0);
  };

  /**
   * Gets names of selected customizations
   * @returns {string} Comma-separated customization names
   */
  const getSelectedCustomizationNames = () => {
    return selectedCustomizations
      .map((optionId) => {
        const option = itemCustomizationOptions.find(
          (opt) => opt.id === optionId,
        );
        return option?.name;
      })
      .filter(Boolean)
      .join(", ");
  };

  return (
    <Card className="card-elevated group hover:scale-105 transition-all duration-300 h-full flex flex-col">
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

      <CardContent className="p-4 md:p-6 flex-1 flex flex-col">
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

        {/* Allergens Section */}
        <div className="mb-4 flex-1">
          {item.allergens && item.allergens.length > 0 ? (
            <div>
              <p className="text-xs text-cafe-gray-500 mb-1">Contains:</p>
              <div className="flex flex-wrap gap-1">
                {item.allergens.map((allergen) => (
                  <Badge key={allergen} variant="secondary" className="text-xs">
                    {allergen}
                  </Badge>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-6"></div>
          )}
        </div>

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
        <div className="space-y-2 mt-auto">
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
                {itemCustomizationOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={option.id}
                      checked={selectedCustomizations.includes(option.id)}
                      onCheckedChange={(checked) =>
                        handleCustomizationChange(option.id, checked)
                      }
                    />
                    <Label
                      htmlFor={option.id}
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
