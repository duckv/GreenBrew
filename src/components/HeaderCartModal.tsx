import { useNavigate } from "react-router-dom";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";

interface HeaderCartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HeaderCartModal({
  isOpen,
  onClose,
}: HeaderCartModalProps) {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getTotalItems, getTotalPrice } =
    useCart();

  const handleCheckout = () => {
    onClose();
    // Check if user has completed location selection
    const storedUserInfo = localStorage.getItem("userInfo");
    const storedOrderType = localStorage.getItem("orderType");

    if (!storedUserInfo || !storedOrderType) {
      // Navigate to home page to start order flow
      navigate("/");
    } else {
      navigate("/checkout");
    }
  };

  const getSubtotal = () => {
    return cart.reduce(
      (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
      0,
    );
  };

  if (!isOpen) return null;

  const totalItems = getTotalItems();

  if (totalItems === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Your Cart</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="text-center py-8">
            <ShoppingCart className="w-12 h-12 text-cafe-gray-400 mx-auto mb-4" />
            <p className="text-cafe-gray-600 mb-6">Your cart is empty</p>
            <Button
              className="btn-primary"
              onClick={() => {
                onClose();
                navigate("/");
              }}
            >
              Start Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[80vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg">Your Cart ({totalItems})</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto space-y-4">
          {cart.map((cartItem) => (
            <div key={cartItem.item.id} className="space-y-3">
              <div className="flex items-start space-x-3">
                <img
                  src={cartItem.item.image}
                  alt={cartItem.item.name}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-cafe-gray-900 text-sm truncate">
                    {cartItem.item.name}
                  </h4>
                  <p className="text-xs text-cafe-gray-600">
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
                            Math.max(1, cartItem.quantity - 1),
                          )
                        }
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-xs font-medium w-6 text-center">
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
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-medium text-brand-brown">
                        ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-6 h-6 p-0 text-red-500 hover:text-red-700"
                        onClick={() => removeFromCart(cartItem.item.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>

        <div className="p-4 border-t space-y-4">
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Total:</span>
            <span className="text-brand-brown">
              ${getSubtotal().toFixed(2)}
            </span>
          </div>
          <Button
            className="w-full bg-brand-brown hover:bg-brand-brown/90 text-white"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>
        </div>
      </Card>
    </div>
  );
}
