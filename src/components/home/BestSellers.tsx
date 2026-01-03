import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import { ProductCard } from '@/components/shop/ProductCard';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const BestSellers = () => {
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h2 className="section-title mb-2">Best Sellers</h2>
            <p className="text-muted-foreground">Our most loved styles</p>
          </div>
          <Link to="/shop">
            <Button variant="outline" className="group">
              View All
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {bestSellers.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
