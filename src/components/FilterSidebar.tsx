
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FilterState } from '@/types/photographer';
import { Filter } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

export const FilterSidebar = ({ filters, setFilters }: FilterSidebarProps) => {
  const styles = ['Outdoor', 'Studio', 'Candid', 'Traditional', 'Indoor'];
  const cities = ['Bengaluru', 'Delhi', 'Mumbai', 'Hyderabad'];
  const ratings = [4, 3, 2, 1];

  return (
    <Card className="glass-card p-6 sticky top-6">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Price Range</Label>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => setFilters({ ...filters, priceRange: value as [number, number] })}
            max={20000}
            min={0}
            step={1000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹{filters.priceRange[0].toLocaleString()}</span>
            <span>₹{filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Minimum Rating</Label>
          <RadioGroup 
            value={filters.rating.toString()} 
            onValueChange={(value) => setFilters({ ...filters, rating: Number(value) })}
          >
            {ratings.map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                <Label htmlFor={`rating-${rating}`} className="text-sm">
                  {rating}+ Stars
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Styles */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Photography Styles</Label>
          <div className="space-y-2">
            {styles.map((style) => (
              <div key={style} className="flex items-center space-x-2">
                <Checkbox
                  id={style}
                  checked={filters.styles.includes(style)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFilters({ ...filters, styles: [...filters.styles, style] });
                    } else {
                      setFilters({ ...filters, styles: filters.styles.filter(s => s !== style) });
                    }
                  }}
                />
                <Label htmlFor={style} className="text-sm">
                  {style}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* City */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">City</Label>
          <Select value={filters.city} onValueChange={(value) => setFilters({ ...filters, city: value === 'all' ? '' : value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Sort By</Label>
          <Select value={filters.sortBy} onValueChange={(value: any) => setFilters({ ...filters, sortBy: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Rating: High to Low</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="recent">Recently Added</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};
