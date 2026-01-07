import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/shop/ProductCard';
import { ProductFilters } from '@/components/shop/ProductFilters';
import { Product, getCategories } from '@/data/products'; 
import { fetchProductsFromN8n } from '@/lib/api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Loader2, AlertCircle } from 'lucide-react';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]); 
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchProductsFromN8n();
        
        if (!data || data.length === 0) {
          console.warn("No products returned from API");
          setProducts([]);
          return;
        }

        // DATA MAPPING: Transform API data to match your 'Product' interface
        const mappedData: Product[] = data.map((item: any, index: number) => ({
          id: item.id || `prod-${index}`,
          name: item.name || 'Unnamed Product',
          price: Number(item.price) || 0,
          originalPrice: item.originalPrice ? Number(item.originalPrice) : undefined,
          // Handle cases where API returns image_url instead of image
          image: item.image_url || item.image || '/placeholder.jpg',
          images: Array.isArray(item.images) ? item.images : [item.image_url || item.image || '/placeholder.jpg'],
          category: item.category || 'Uncategorized',
          brand: item.brand || 'Premium Wear',
          // Ensure arrays exist so .filter and .some don't crash
          colors: Array.isArray(item.colors) ? item.colors : ['Default'],
          sizes: Array.isArray(item.sizes) ? item.sizes : ['7', '8', '9', '10', '11'],
          rating: Number(item.rating) || 4.5,
          reviews: Number(item.reviews) || 0,
          description: item.description || '',
          features: Array.isArray(item.features) ? item.features : [],
          isBestSeller: !!item.isBestSeller,
          isNew: !!item.isNew
        }));
        
        setProducts(mappedData);
      } catch (err) {
        console.error("Shop Load Error:", err);
        setError("Failed to load products. Please check your connection.");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Calculate dynamic categories based on the mapped API products
  const categories = useMemo(() => {
    // Pass the raw product list from state, NOT filteredProducts
    return getCategories(products);
  }, [products]);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    }

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [products, searchQuery, selectedCategory, priceRange, selectedSizes, sortBy]);

  return (
    <Layout>
      <section className="bg-slate-50 py-12 border-b">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">Shop Collection</h1>
          <p className="text-muted-foreground">Discover our latest premium sneakers</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div className="flex gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-64 flex-shrink-0">
              <ProductFilters
                categories={categories} 
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                selectedSizes={selectedSizes}
                onSizeChange={setSelectedSizes}
              />
            </aside>

            <div className="flex-1">
              {isLoading ? (
                <div className="flex flex-col items-center py-20">
                  <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                  <p className="text-muted-foreground">Loading products...</p>
                </div>
              ) : error ? (
                <div className="text-center py-20 bg-red-50 rounded-lg border border-red-100">
                  <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-red-800">{error}</h3>
                  <button 
                    onClick={() => window.location.reload()}
                    className="mt-4 text-sm font-semibold text-primary underline"
                  >
                    Try Again
                  </button>
                </div>
              ) : filteredProducts.length > 0 ? (
                <>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Showing {filteredProducts.length} products
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-20 border-2 border-dashed rounded-lg">
                  <h3 className="text-lg font-medium">No products found</h3>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your filters or search query.
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