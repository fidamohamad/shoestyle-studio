import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/shop/ProductCard';
import { ProductFilters } from '@/components/shop/ProductFilters';
import { products } from '@/data/products';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Search, SlidersHorizontal, Grid3X3, LayoutGrid } from 'lucide-react';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [gridView, setGridView] = useState<'compact' | 'wide'>('wide');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price filter
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Size filter
    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, priceRange, selectedSizes, sortBy]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="section-title text-primary-foreground mb-4">Shop All Shoes</h1>
          <p className="text-primary-foreground/70 max-w-xl mx-auto">
            Discover our complete collection of premium footwear
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          {/* Search & Sort Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <ProductFilters
                      selectedCategory={selectedCategory}
                      onCategoryChange={setSelectedCategory}
                      priceRange={priceRange}
                      onPriceChange={setPriceRange}
                      selectedSizes={selectedSizes}
                      onSizeChange={setSelectedSizes}
                    />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Grid Toggle */}
              <div className="hidden md:flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setGridView('compact')}
                  className={`p-2 transition-colors ${
                    gridView === 'compact' ? 'bg-accent text-accent-foreground' : 'hover:bg-secondary'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setGridView('wide')}
                  className={`p-2 transition-colors ${
                    gridView === 'wide' ? 'bg-accent text-accent-foreground' : 'hover:bg-secondary'
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 flex-shrink-0">
              <ProductFilters
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                selectedSizes={selectedSizes}
                onSizeChange={setSelectedSizes}
              />
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <p className="text-muted-foreground mb-6">
                Showing {filteredProducts.length} products
              </p>

              {filteredProducts.length > 0 ? (
                <div
                  className={`grid gap-4 md:gap-6 ${
                    gridView === 'compact'
                      ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                      : 'grid-cols-2 lg:grid-cols-3'
                  }`}
                >
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">No products found</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
