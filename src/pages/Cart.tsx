import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container-custom text-center">
            <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-3xl font-display font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items yet.
            </p>
            <Link to="/shop">
              <Button className="btn-accent">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex gap-4 md:gap-6 p-4 bg-card rounded-xl"
                >
                  <Link
                    to={`/product/${item.id}`}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden flex-shrink-0 bg-secondary"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <div>
                        <Link
                          to={`/product/${item.id}`}
                          className="font-medium text-foreground hover:text-accent transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">
                          Size: {item.size} | Color: {item.color}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.size, item.color)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex justify-between items-end mt-auto pt-4">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.color, item.quantity - 1)
                          }
                          className="p-2 hover:bg-secondary transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-10 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.color, item.quantity + 1)
                          }
                          className="p-2 hover:bg-secondary transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="font-semibold text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <Button
                variant="ghost"
                onClick={clearCart}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 sticky top-24">
                <h2 className="font-display text-xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{totalPrice >= 100 ? 'Free' : '$10.00'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${(totalPrice * 0.08).toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>
                      $
                      {(
                        totalPrice +
                        (totalPrice >= 100 ? 0 : 10) +
                        totalPrice * 0.08
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mt-6">
                  <label className="text-sm font-medium mb-2 block">Promo Code</label>
                  <div className="flex gap-2">
                    <Input placeholder="Enter code" className="flex-1" />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>

                <Button className="w-full btn-accent mt-6 h-12">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
