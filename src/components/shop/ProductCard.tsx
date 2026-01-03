import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { Product } from '@/data/products';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`} className="group block product-card">
      <div className="relative aspect-square overflow-hidden bg-secondary rounded-t-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-accent text-accent-foreground">New</Badge>
          )}
          {product.originalPrice && (
            <Badge variant="destructive">Sale</Badge>
          )}
        </div>

        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
          onClick={(e) => {
            e.preventDefault();
            // Add wishlist functionality
          }}
        >
          <Heart className="h-4 w-4 text-foreground" />
        </button>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-background text-foreground px-6 py-2 rounded-full text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform">
            Quick View
          </span>
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
          {product.brand}
        </p>
        <h3 className="font-medium text-foreground group-hover:text-accent transition-colors mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            <span className="text-sm text-foreground">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
