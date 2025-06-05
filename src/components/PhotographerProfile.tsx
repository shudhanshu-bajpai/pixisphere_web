
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star, MapPin, Camera, Phone, Mail, ArrowLeft } from 'lucide-react';
import { Photographer } from '@/types/photographer';

interface PhotographerProfileProps {
  photographer: Photographer;
  onBack: () => void;
}

export const PhotographerProfile = ({ photographer, onBack }: PhotographerProfileProps) => {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Listings
        </Button>
      </div>

      {/* Profile Header */}
      <Card className="glass-card overflow-hidden">
        <div className="relative h-64 bg-gradient-to-r from-primary/20 to-orange-400/20">
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="p-8 -mt-20 relative">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img
              src={photographer.profilePic}
              alt={photographer.name}
              className="w-32 h-32 rounded-2xl object-cover border-4 border-background shadow-xl"
            />
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold gradient-text">{photographer.name}</h1>
                <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {photographer.location}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-primary text-primary" />
                    {photographer.rating} Rating
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">{photographer.bio}</p>
              
              <div className="flex flex-wrap gap-2">
                {photographer.styles.map((style) => (
                  <Badge key={style} variant="outline" className="border-primary text-primary">
                    {style}
                  </Badge>
                ))}
                {photographer.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-primary">
                  ₹{photographer.price.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground ml-1">starting</span>
                </div>
                
                <Dialog open={inquiryOpen} onOpenChange={setInquiryOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Inquiry
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Send Inquiry to {photographer.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <Input placeholder="Your Name" />
                      <Input placeholder="Your Email" />
                      <Input placeholder="Your Phone" />
                      <Textarea placeholder="Tell us about your shoot requirements..." />
                      <Button className="w-full">Send Inquiry</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Portfolio */}
      <Card className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Camera className="w-5 h-5 mr-2 text-primary" />
          Portfolio
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {photographer.portfolio.map((image, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg">
              <img
                src={image}
                alt={`Portfolio ${index + 1}`}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </Card>

      {/* Reviews */}
      <Card className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        <div className="space-y-4">
          {photographer.reviews.map((review, index) => (
            <div key={index} className="border-l-2 border-primary pl-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">{review.name}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'fill-primary text-primary' : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{review.date}</span>
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
