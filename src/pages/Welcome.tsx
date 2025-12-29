import { useNavigate } from 'react-router-dom';
import { Sparkles, ShoppingBag, Heart, TrendingUp, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Welcome = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="font-display text-xl font-bold">
            Online <span style={{ color: '#1800ad' }}>Feriwala</span>
          </a>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Hello, <span className="font-medium text-foreground">{user?.name}</span>
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Welcome Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          {/* Welcome Animation */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-12 h-12 text-white animate-pulse" />
            </div>
          </div>

          {/* Welcome Text */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4 animate-fade-up">
            Welcome, {user?.name?.split(' ')[0]}! 🎉
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            You're now part of the Online Feriwala family! Explore our amazing collection of handcrafted products.
          </p>

          {/* Shop Now Button */}
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => navigate('/')}
              className="text-lg px-8 py-6 h-auto"
            >
              <ShoppingBag className="w-6 h-6 mr-2" />
              Shop Now
              <TrendingUp className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-hover transition-all duration-300">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Explore Products</h3>
              <p className="text-muted-foreground text-sm">
                Browse through our curated collection of handcrafted items from talented artisans.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-hover transition-all duration-300">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Support Artisans</h3>
              <p className="text-muted-foreground text-sm">
                Every purchase supports local craftsmen and keeps traditional arts alive.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-hover transition-all duration-300">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Unique Finds</h3>
              <p className="text-muted-foreground text-sm">
                Discover one-of-a-kind treasures you won't find anywhere else.
              </p>
            </div>
          </div>

          {/* Member Benefits */}
          <div className="mt-16 bg-card rounded-2xl p-8 shadow-soft animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="font-display text-2xl font-semibold mb-6">Your Member Benefits</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-muted-foreground">Free delivery on orders above ৳1000</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-muted-foreground">Exclusive member-only discounts</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-muted-foreground">Early access to new products</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-muted-foreground">Order tracking & history</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Welcome;
