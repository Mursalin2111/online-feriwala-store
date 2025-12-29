import { ShoppingCart, Menu, X, User, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  onCartClick: () => void;
}

const Navbar = ({ onCartClick }: NavbarProps) => {
  const { getTotalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = getTotalItems();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <span className="font-display text-xl font-semibold text-foreground hover:text-primary transition-colors">
              Online <span style={{ color: '#1800ad' }}>Feriwala</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Home
            </a>
            <a href="#products" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Products
            </a>
            <a href="#categories" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Categories
            </a>
            <a href="#about" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              About
            </a>
          </div>

          {/* Auth & Cart Buttons */}
          <div className="flex items-center gap-3">
            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Hi,</span>
                  <span className="font-medium text-foreground">{user?.name?.split(' ')[0]}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">
                    <LogIn className="w-4 h-4 mr-1" />
                    Login
                  </Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}

            {/* Cart Button */}
            <Button
              variant="cart"
              size="icon"
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-up">
            <div className="flex flex-col gap-4">
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                Home
              </a>
              <a href="#products" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                Products
              </a>
              <a href="#categories" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                Categories
              </a>
              <a href="#about" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                About
              </a>
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t border-border">
                {isAuthenticated ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      <span className="font-medium">{user?.name}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-1" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" asChild>
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button variant="default" className="flex-1" asChild>
                      <Link to="/register">Register</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
