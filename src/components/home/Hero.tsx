import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-copper blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-copper blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-copper/20 rounded-full">
              <span className="text-copper text-sm font-medium tracking-wide uppercase">
                New Collection 2026
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight">
              Step Into
              <br />
              <span className="text-gradient-copper">Elegance</span>
            </h1>
            
            <p className="text-primary-foreground/70 text-lg md:text-xl max-w-lg mx-auto lg:mx-0">
              Discover our curated collection of premium footwear, where timeless design meets exceptional comfort.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/shop">
                <Button className="btn-accent group">
                  Shop Collection
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="border-2 border-primary-foreground/30 hover:bg-primary-foreground/10 hover:border-primary-foreground/50 px-8 py-3 font-medium tracking-wide uppercase text-sm">
                  Our Story
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 justify-center lg:justify-start pt-8 border-t border-primary-foreground/10">
              <div>
                <p className="text-3xl font-display font-bold text-primary-foreground">1,000+</p>
                <p className="text-primary-foreground/50 text-sm">Products Reviewed</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-primary-foreground">50+</p>
                <p className="text-primary-foreground/50 text-sm">Top Brands Compared</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-primary-foreground">Daily</p>
                <p className="text-primary-foreground/50 text-sm">Price Updates</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative hidden lg:block animate-fade-in-right" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <div className="absolute inset-0 bg-copper/20 rounded-full blur-3xl transform scale-75" />
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop"
                alt="Premium Shoe"
                className="relative z-10 w-full max-w-lg mx-auto drop-shadow-2xl animate-float"
              />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute bottom-10 left-0 bg-background/95 backdrop-blur-sm rounded-lg p-4 shadow-elegant animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <p className="text-sm text-muted-foreground">Starting from</p>
              <p className="text-2xl font-display font-bold text-foreground">$79</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
