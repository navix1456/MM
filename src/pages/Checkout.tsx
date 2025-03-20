import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/components/ui/CartItem';
import { getCartTotal } from '@/utils/cartStorage';
import { useAuth } from '@/context/AuthContext';
import { toast } from "sonner";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zip: z.string().min(5, { message: "Valid ZIP code is required" }),
  country: z.string().min(2, { message: "Country is required" }),
  cardName: z.string().min(2, { message: "Name on card is required" }),
  cardNumber: z.string().min(15, { message: "Valid card number is required" }),
  expiry: z.string().min(4, { message: "Valid expiry date is required" }),
  cvv: z.string().min(3, { message: "Valid CVV is required" }),
});

type FormValues = z.infer<typeof formSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(!isAuthenticated);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: user?.email || "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: ""
    }
  });

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-mafia-gold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button onClick={() => navigate('/products')} className="bg-mafia-gold text-mafia-dark hover:bg-mafia-accent">
          Browse Products
        </Button>
      </div>
    );
  }

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log("Admin notification:", {
        orderId: `ORD-${Date.now()}`,
        customerEmail: data.email,
        customerName: `${data.firstName} ${data.lastName}`,
        orderTotal: total,
        items: cart,
        shippingAddress: {
          address: data.address,
          city: data.city,
          state: data.state,
          zip: data.zip,
          country: data.country
        },
        timestamp: new Date().toISOString()
      });
      
      toast.success("Order placed successfully! Admin has been notified.");
      clearCart();
      navigate('/');
      setIsSubmitting(false);
    }, 1500);
  };

  const handleAuthPrompt = () => {
    sessionStorage.setItem('pendingCheckout', 'true');
    navigate('/products');
    toast.info("Please sign in to complete your purchase");
  };

  const subtotal = getCartTotal();
  const shipping = 5.99;
  const total = subtotal + shipping;

  if (showAuthPrompt && !isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-mafia-gold mb-4">Authentication Required</h1>
        <p className="text-gray-400 mb-8">You need to sign in before completing your purchase.</p>
        <div className="flex flex-col gap-4 items-center justify-center">
          <Button onClick={handleAuthPrompt} className="bg-mafia-gold text-mafia-dark hover:bg-mafia-accent">
            Sign In to Continue
          </Button>
          <Button variant="outline" onClick={() => navigate('/products')} className="border-mafia-gray/40 text-mafia-light hover:bg-mafia-gray/20">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-mafia-gold mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-mafia-gray p-6 rounded-lg mb-6">
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input className="bg-mafia-dark border-mafia-accent" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input className="bg-mafia-dark border-mafia-accent" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" className="bg-mafia-dark border-mafia-accent" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input className="bg-mafia-dark border-mafia-accent" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="bg-mafia-gray p-6 rounded-lg mb-6">
                <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input className="bg-mafia-dark border-mafia-accent" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input className="bg-mafia-dark border-mafia-accent" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input className="bg-mafia-dark border-mafia-accent" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="zip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP Code</FormLabel>
                          <FormControl>
                            <Input className="bg-mafia-dark border-mafia-accent" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input className="bg-mafia-dark border-mafia-accent" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-mafia-gray p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="cardName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name on Card</FormLabel>
                        <FormControl>
                          <Input className="bg-mafia-dark border-mafia-accent" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input className="bg-mafia-dark border-mafia-accent" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/YY" className="bg-mafia-dark border-mafia-accent" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input className="bg-mafia-dark border-mafia-accent" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
        
              <div className="lg:hidden">
                <div className="bg-mafia-gray p-6 rounded-lg mb-6">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                  
                  <Separator className="my-4 bg-mafia-accent/50" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <Separator className="my-2 bg-mafia-accent/50" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full lg:hidden bg-mafia-gold text-mafia-dark hover:bg-mafia-accent"
              >
                {isSubmitting ? 'Processing...' : 'Complete Order'}
              </Button>
            </form>
          </Form>
        </div>
        
        <div className="lg:w-2/5 hidden lg:block">
          <div className="bg-mafia-gray p-6 rounded-lg sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            
            <Separator className="my-4 bg-mafia-accent/50" />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <Separator className="my-2 bg-mafia-accent/50" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              onClick={form.handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="w-full mt-6 bg-mafia-gold text-mafia-dark hover:bg-mafia-accent"
            >
              {isSubmitting ? 'Processing...' : 'Complete Order'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
