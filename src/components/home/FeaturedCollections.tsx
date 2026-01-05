import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    name: 'Formal Elegance',
    description: 'Premium leather for special occasions',
    image: '/highheel.jpg',
    category: 'Formal',
  },
  {
    name: 'Athletic Performance',
    description: 'Engineered for maximum comfort',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=800&fit=crop',
    category: 'Sports',
  },
  {
    name: 'Casual Comfort',
    description: 'Everyday style meets comfort',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=800&fit=crop',
    category: 'Casual',
  },
];

export const FeaturedCollections = () => {
  return (
    <section className="py-20 bg-gradient-cream">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Featured Collections</h2>
          <p className="section-subtitle mx-auto">
            Explore our curated collections designed for every occasion
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <Link
              key={collection.name}
              to={`/shop?category=${collection.category}`}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={collection.image}
                alt={collection.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                <h3 className="font-display text-2xl font-semibold mb-2">{collection.name}</h3>
                <p className="text-primary-foreground/70 text-sm mb-4">{collection.description}</p>
                <span className="inline-flex items-center text-copper font-medium text-sm group-hover:gap-3 transition-all">
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
