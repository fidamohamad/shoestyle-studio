import { categories } from '@/data/products';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface ProductFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  selectedSizes: string[];
  onSizeChange: (sizes: string[]) => void;
}

const sizes = ['5', '6', '7', '8', '9', '10', '11', '12', '13'];

export const ProductFilters = ({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  selectedSizes,
  onSizeChange,
}: ProductFiltersProps) => {
  const handleSizeToggle = (size: string) => {
    if (selectedSizes.includes(size)) {
      onSizeChange(selectedSizes.filter((s) => s !== size));
    } else {
      onSizeChange([...selectedSizes, size]);
    }
  };

  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={['category', 'price', 'size']} className="w-full">
        {/* Categories */}
        <AccordionItem value="category">
          <AccordionTrigger className="text-lg font-display font-semibold">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => onCategoryChange(category.name)}
                  className={`w-full flex justify-between items-center py-2 px-3 rounded-lg transition-smooth ${
                    selectedCategory === category.name
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-secondary'
                  }`}
                >
                  <span className="text-sm">{category.name}</span>
                  <span className="text-xs text-muted-foreground">{category.count}</span>
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-lg font-display font-semibold">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 px-2">
              <Slider
                value={priceRange}
                onValueChange={(value) => onPriceChange(value as [number, number])}
                min={0}
                max={300}
                step={10}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Size */}
        <AccordionItem value="size">
          <AccordionTrigger className="text-lg font-display font-semibold">
            Size
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-2 pt-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeToggle(size)}
                  className={`py-2 px-3 text-sm rounded-lg border transition-smooth ${
                    selectedSizes.includes(size)
                      ? 'border-accent bg-accent text-accent-foreground'
                      : 'border-border hover:border-accent'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
