
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Camera } from 'lucide-react';
import { Photographer } from '@/types/photographer';

interface PhotographerCardProps {
  photographer: Photographer;
  onViewProfile: (id: number) => void;
}

export const PhotographerCard = ({ photographer, onViewProfile }: PhotographerCardProps) => {
  return (
    <Card className="glass-card hover-scale overflow-hidden group cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={photographer.profilePic} 
          alt={photographer.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-black/50 text-white border-0">
            <Star className="w-3 h-3 mr-1 fill-primary text-primary" />
            {photographer.rating}
          </Badge>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
            {photographer.name}
          </h3>
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="w-3 h-3 mr-1" />
            {photographer.location}
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {photographer.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary">₹{photographer.price.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground ml-1">starting</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 hover:bg-primary hover:text-primary-foreground"
            onClick={() => onViewProfile(photographer.id)}
          >
            <Camera className="w-4 h-4 mr-2" />
            View Profile
          </Button>
        </div>
      </div>
    </Card>
  );
};
