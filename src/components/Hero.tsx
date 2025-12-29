import { Button } from '@/components/ui/button';
import { Sparkles, TrendingUp } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden gradient-hero py-20 lg:py-32">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl animate-float" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 animate-fade-up">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Discover Unique Treasures</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Welcome to{' '}
            <span className="text-primary">Online Feriwala</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Your digital marketplace for handcrafted goods, artisan products, and unique finds from around the world. Experience the charm of a traditional fair from the comfort of your home.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="hero" size="lg" asChild>
              <a href="#products">
                Shop Now
                <TrendingUp className="w-5 h-5 ml-1" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#categories">Browse Categories</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 py-8 px-6 bg-secondary/60 rounded-2xl animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div>
              <p className="text-2xl md:text-3xl font-display font-bold text-primary">10+</p>
              <p className="text-sm text-muted-foreground">Products</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-display font-bold text-primary">5+</p>
              <p className="text-sm text-muted-foreground">Artisans</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-display font-bold text-primary">100+</p>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
