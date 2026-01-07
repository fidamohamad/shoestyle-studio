import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Product } from '@/data/products';
import { fetchProductsFromN8n } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/shop/ProductCard';
import { useToast } from '@/hooks/use-toast';
import { 
  Star, 
  Heart, 
  Minus, 
  Plus, 
  Truck, 
  Shield, 
  RotateCcw, 
  ChevronRight, 
  Loader2 
} from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { toast } = useToast();

  // State for dynamic data
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // State for user selections
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Fetch product data from n8n API
  useEffect(() => {
    async function loadProductData() {
      try {
        setLoading(true);
        const allProducts = await fetchProductsFromN8n();
        
        // Find the specific product by ID
        const foundProduct = allProducts.find((p) => p.id === id);
        
        if (foundProduct) {
          setProduct(foundProduct);
          // Set related products (same category, excluding current)
          const related = allProducts
            .filter((p) => p.category === foundProduct.category && p.id !== id)
            .slice(0, 4);
          setRelatedProducts(related);
          
          // Set default selections if data exists
          if (foundProduct.colors?.length > 0) setSelectedColor(foundProduct.colors[0]);
        }
      } catch (error) {
        console.error("Error loading product detail:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProductData();
    // Scroll to top when ID changes
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    if (!selectedSize || !selectedColor) {
      toast({
        title: 'Please select options',
        description: 'Choose a size and color before adding to cart',
        variant: 'destructive',
      });
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });

    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart`,
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-40 flex flex-col items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-accent mb-4" />
          <p className="text-muted-foreground font-medium">Loading product details...</p>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-20 text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you are looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/shop">Return to Shop</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-secondary/50 py-4 border-b">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link to="/shop" className="text-muted-foreground hover:text-accent transition-colors">Shop</Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="py-12">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column: Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-secondary border shadow-sm">
                <img
                  src={product.images[selectedImage] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? 'border-accent shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Details */}
            <div className="space-y-8">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.isNew && <Badge className="bg-accent">New Arrival</Badge>}
                  {product.originalPrice && <Badge variant="destructive">Sale</Badge>}
                  <Badge variant="outline" className="border-accent text-accent">{product.category}</Badge>
                </div>
                
                <p className="text-muted-foreground uppercase text-xs tracking-[0.2em] mb-2 font-semibold">
                  {product.brand}
                </p>
                <h1 className="text-4xl font-display font-bold text-foreground mb-4">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold text-foreground">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through decoration-red-500/50">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed text-lg italic border-l-4 border-accent pl-4">
                "{product.description}"
              </p>

              {/* Selection Options */}
              <div className="space-y-6 pt-4">
                {/* Color Selection */}
                <div>
                  <label className="block text-sm font-bold mb-3 uppercase tracking-wider">
                    Color: <span className="text-accent ml-2 font-normal">{selectedColor || 'Select Color'}</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-5 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                          selectedColor === color
                            ? 'border-accent bg-accent text-white'
                            : 'border-border hover:border-accent/50'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-bold uppercase tracking-wider">
                      Size: <span className="text-accent ml-2 font-normal">{selectedSize || 'Select Size'}</span>
                    </label>
                    <button className="text-xs font-bold text-muted-foreground hover:text-accent underline underline-offset-4">SIZE GUIDE</button>
                  </div>
                  <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 rounded-lg border-2 text-sm font-bold transition-all ${
                          selectedSize === size
                            ? 'border-accent bg-accent/5 text-accent'
                            : 'border-border hover:border-accent/50 text-muted-foreground'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <div className="flex items-center border-2 rounded-xl h-14 px-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:text-accent transition-colors"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <span className="w-10 text-center font-bold text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:text-accent transition-colors"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <Button onClick={handleAddToCart} className="flex-1 btn-accent h-14 text-lg font-bold rounded-xl shadow-lg shadow-accent/20">
                    Add to Bag
                  </Button>
                  
                  <Button variant="outline" size="icon" className="h-14 w-14 rounded-xl border-2 hover:bg-red-50 hover:border-red-200 group">
                    <Heart className="h-6 w-6 group-hover:fill-red-500 group-hover:text-red-500 transition-all" />
                  </Button>
                </div>
              </div>

              {/* Service Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-y border-dashed">
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-2 rounded-lg"><Truck className="h-5 w-5 text-accent" /></div>
                  <div>
                    <p className="text-xs font-bold">Fast Delivery</p>
                    <p className="text-[10px] text-muted-foreground">Free on orders $150+</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-2 rounded-lg"><RotateCcw className="h-5 w-5 text-accent" /></div>
                  <div>
                    <p className="text-xs font-bold">Easy Returns</p>
                    <p className="text-[10px] text-muted-foreground">30-day window</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-2 rounded-lg"><Shield className="h-5 w-5 text-accent" /></div>
                  <div>
                    <p className="text-xs font-bold">Authentic Only</p>
                    <p className="text-[10px] text-muted-foreground">Verified hardware</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Tabs Section */}
          <div className="mt-20">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="flex w-full justify-start border-b rounded-none h-auto p-0 bg-transparent space-x-8">
                <TabsTrigger value="details" className="tabs-trigger-style">Details</TabsTrigger>
                <TabsTrigger value="size-guide" className="tabs-trigger-style">Size Guide</TabsTrigger>
                <TabsTrigger value="reviews" className="tabs-trigger-style">Reviews ({product.reviews})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="py-10">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-display font-bold mb-6">Product Story</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Elevate your performance and style with the {product.name}. Designed for the modern 
                      athlete who demands excellence, this silhouette combines heritage design with 
                      next-generation technology.
                    </p>
                  </div>
                  <div className="bg-secondary/30 p-8 rounded-2xl">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-accent" /> Key Features
                    </h3>
                    <ul className="space-y-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="size-guide" className="py-10">
                <div className="max-w-2xl">
                  <h3 className="text-2xl font-display font-bold mb-6">Men's Footwear Size Chart</h3>
                  <div className="border rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-secondary">
                        <tr className="border-b">
                          <th className="py-4 px-6 text-left">US Size</th>
                          <th className="py-4 px-6 text-left">UK Size</th>
                          <th className="py-4 px-6 text-left">EU Size</th>
                          <th className="py-4 px-6 text-left">CM (Heel-to-toe)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {[
                          ['7', '6', '40', '25.1'],
                          ['8', '7', '41', '25.9'],
                          ['9', '8', '42', '26.7'],
                          ['10', '9', '43', '27.6'],
                          ['11', '10', '44', '28.4'],
                          ['12', '11', '45', '29.2'],
                        ].map((row, i) => (
                          <tr key={i} className="hover:bg-accent/5 transition-colors">
                            {row.map((cell, j) => (
                              <td key={j} className="py-4 px-6 text-muted-foreground">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="py-10">
                 <div className="flex flex-col items-center justify-center py-10 bg-secondary/20 rounded-3xl border border-dashed">
                    <Star className="h-10 w-10 text-accent mb-4 opacity-20" />
                    <p className="font-medium">Rating: {product.rating} / 5.0</p>
                    <p className="text-sm text-muted-foreground mt-1">Based on {product.reviews} verified purchases</p>
                    <Button variant="outline" className="mt-6">Write a Review</Button>
                 </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-32">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h2 className="text-3xl font-display font-bold">You May Also Like</h2>
                  <p className="text-muted-foreground">Similar styles for your collection</p>
                </div>
                <Button variant="ghost" className="text-accent" asChild>
                  <Link to="/shop">View All <ChevronRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tailwind Style for Tabs */}
      <style>{`
        .tabs-trigger-style {
          background: transparent !important;
          border-bottom: 2px solid transparent;
          border-radius: 0;
          padding: 1rem 0;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          color: #64748b;
          transition: all 0.2s;
        }
        .tabs-trigger-style[data-state="active"] {
          border-bottom-color: hsl(var(--accent));
          color: hsl(var(--foreground));
        }
      `}</style>
    </Layout>
  );
};

export default ProductDetail;