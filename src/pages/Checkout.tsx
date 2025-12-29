import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, Truck, CheckCircle2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    bkashNumber: '',
    nagadNumber: '',
    transactionId: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const deliveryCharge = 60;
  const subtotal = getTotalPrice();
  const total = subtotal + deliveryCharge;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (formData.phone && !/^01[3-9]\d{8}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid Bangladesh phone number';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';

    // Payment specific validations
    if (paymentMethod === 'bkash') {
      if (!formData.bkashNumber.trim()) newErrors.bkashNumber = 'bKash number is required';
      if (!formData.transactionId.trim()) newErrors.transactionId = 'Transaction ID is required';
    }
    if (paymentMethod === 'nagad') {
      if (!formData.nagadNumber.trim()) newErrors.nagadNumber = 'Nagad number is required';
      if (!formData.transactionId.trim()) newErrors.transactionId = 'Transaction ID is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateOrderId = () => {
    return 'FW' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newOrderId = generateOrderId();
    setOrderId(newOrderId);
    setIsProcessing(false);
    setOrderSuccess(true);
    clearCart();
  };

  const handleCloseSuccess = () => {
    setOrderSuccess(false);
    navigate('/');
  };

  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-2xl font-display font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-4">Add some products before checkout</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-display text-xl font-semibold">
              Online <span style={{ color: '#1800ad' }}>Feriwala</span> - Checkout
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Information */}
              <div className="bg-card rounded-xl p-6 shadow-soft">
                <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  Delivery Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={errors.fullName ? 'border-destructive' : ''}
                    />
                    {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="01XXXXXXXXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? 'border-destructive' : ''}
                    />
                    {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="address">Full Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="House, Road, Area"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={errors.address ? 'border-destructive' : ''}
                    />
                    {errors.address && <p className="text-destructive text-sm mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Dhaka"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? 'border-destructive' : ''}
                    />
                    {errors.city && <p className="text-destructive text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code (Optional)</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      placeholder="1229"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-card rounded-xl p-6 shadow-soft">
                <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Payment Method
                </h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  {/* Cash on Delivery */}
                  <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Truck className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-sm text-muted-foreground">Pay when you receive</p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  {/* bKash */}
                  <div className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${paymentMethod === 'bkash' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                    <RadioGroupItem value="bkash" id="bkash" className="mt-1" />
                    <Label htmlFor="bkash" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                          <Smartphone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">bKash</p>
                          <p className="text-sm text-muted-foreground">Mobile payment</p>
                        </div>
                      </div>
                      {paymentMethod === 'bkash' && (
                        <div className="space-y-3 mt-4 pt-4 border-t">
                          <div className="bg-pink-50 p-3 rounded-lg text-sm">
                            <p className="font-medium text-pink-700 mb-1">Send money to:</p>
                            <p className="text-pink-900 font-bold text-lg">01712-345678</p>
                            <p className="text-pink-600 mt-1">Reference: Your Phone Number</p>
                          </div>
                          <div>
                            <Label htmlFor="bkashNumber">Your bKash Number *</Label>
                            <Input
                              id="bkashNumber"
                              name="bkashNumber"
                              placeholder="01XXXXXXXXX"
                              value={formData.bkashNumber}
                              onChange={handleInputChange}
                              className={errors.bkashNumber ? 'border-destructive' : ''}
                            />
                            {errors.bkashNumber && <p className="text-destructive text-sm mt-1">{errors.bkashNumber}</p>}
                          </div>
                          <div>
                            <Label htmlFor="transactionId">Transaction ID *</Label>
                            <Input
                              id="transactionId"
                              name="transactionId"
                              placeholder="e.g., 8N7A5K3M2P"
                              value={formData.transactionId}
                              onChange={handleInputChange}
                              className={errors.transactionId ? 'border-destructive' : ''}
                            />
                            {errors.transactionId && <p className="text-destructive text-sm mt-1">{errors.transactionId}</p>}
                          </div>
                        </div>
                      )}
                    </Label>
                  </div>

                  {/* Nagad */}
                  <div className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${paymentMethod === 'nagad' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                    <RadioGroupItem value="nagad" id="nagad" className="mt-1" />
                    <Label htmlFor="nagad" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                          <Smartphone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">Nagad</p>
                          <p className="text-sm text-muted-foreground">Mobile payment</p>
                        </div>
                      </div>
                      {paymentMethod === 'nagad' && (
                        <div className="space-y-3 mt-4 pt-4 border-t">
                          <div className="bg-orange-50 p-3 rounded-lg text-sm">
                            <p className="font-medium text-orange-700 mb-1">Send money to:</p>
                            <p className="text-orange-900 font-bold text-lg">01712-345678</p>
                            <p className="text-orange-600 mt-1">Reference: Your Phone Number</p>
                          </div>
                          <div>
                            <Label htmlFor="nagadNumber">Your Nagad Number *</Label>
                            <Input
                              id="nagadNumber"
                              name="nagadNumber"
                              placeholder="01XXXXXXXXX"
                              value={formData.nagadNumber}
                              onChange={handleInputChange}
                              className={errors.nagadNumber ? 'border-destructive' : ''}
                            />
                            {errors.nagadNumber && <p className="text-destructive text-sm mt-1">{errors.nagadNumber}</p>}
                          </div>
                          <div>
                            <Label htmlFor="transactionId">Transaction ID *</Label>
                            <Input
                              id="transactionId"
                              name="transactionId"
                              placeholder="e.g., NGDXXXXXX"
                              value={formData.transactionId}
                              onChange={handleInputChange}
                              className={errors.transactionId ? 'border-destructive' : ''}
                            />
                            {errors.transactionId && <p className="text-destructive text-sm mt-1">{errors.transactionId}</p>}
                          </div>
                        </div>
                      )}
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 shadow-soft sticky top-24">
                <h2 className="font-display text-lg font-semibold mb-4">Order Summary</h2>
                
                {/* Cart Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                        <p className="text-muted-foreground text-sm">Qty: {item.quantity}</p>
                        <p className="text-primary font-semibold">৳{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Pricing */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>৳{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Charge</span>
                    <span>৳{deliveryCharge.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">৳{total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  className="w-full mt-6"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>Place Order - ৳{total.toFixed(2)}</>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  By placing this order, you agree to our Terms of Service
                </p>
              </div>
            </div>
          </div>
        </form>
      </main>

      {/* Success Dialog */}
      <Dialog open={orderSuccess} onOpenChange={handleCloseSuccess}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <DialogTitle className="text-2xl font-display">Order Placed Successfully!</DialogTitle>
            <DialogDescription className="text-base">
              Thank you for shopping with Online Feriwala
            </DialogDescription>
          </DialogHeader>
          <div className="bg-secondary/50 rounded-lg p-4 my-4">
            <p className="text-sm text-muted-foreground">Order ID</p>
            <p className="text-xl font-bold text-primary">{orderId}</p>
          </div>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>You will receive a confirmation SMS shortly.</p>
            <p>Expected delivery: 3-5 business days</p>
          </div>
          <Button onClick={handleCloseSuccess} className="w-full mt-4">
            Continue Shopping
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Checkout;
