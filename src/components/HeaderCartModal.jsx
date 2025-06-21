/**
 * Header cart modal component
 * Cart overlay accessible from header cart button
 */
import { useNavigate } from "react-router-dom";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";

/**
 * Header cart modal for quick cart access
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Close modal handler
 * @returns {JSX.Element} Cart modal overlay
 */
export default function HeaderCartModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getTotalItems, getTotalPrice } =
    useCart();

  /**
   * Handles checkout button click
   */
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

  /**
   * Calculates cart subtotal
   * @returns {number} Subtotal amount
   */
  const getSubtotal = () => {
    return cart.reduce(
      (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
      0,
    );
  };

  // Don't render if not open
  if (!isOpen) return null;

  const totalItems = getTotalItems();

  // Empty cart state
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
            <div key={cartItem.item.id}>
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
              <Separator />
            </div>
          ))}
        </CardContent>

        <CardContent className="pt-4 space-y-2">
          <div className="flex justify-between text-lg font-bold text-cafe-gray-900">
            <span>Subtotal</span>
            <span>${getSubtotal().toFixed(2)}</span>
          </div>
          {getSubtotal() > 150 && (
            <div className="text-center p-3 bg-red-50 border border-red-200 rounded-lg">
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
        </CardContent>

        <div className="p-6 pt-0 space-y-3">
          <Button
            className="w-full btn-primary"
            onClick={handleCheckout}
            disabled={getSubtotal() > 150}
          >
            Checkout - ${getSubtotal().toFixed(2)}
          </Button>
          <Button variant="outline" className="w-full" onClick={onClose}>
            Continue Shopping
          </Button>
        </div>
      </Card>
    </div>
  );
}
