
import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { FilterSidebar } from '@/components/FilterSidebar';
import { PhotographerCard } from '@/components/PhotographerCard';
import { PhotographerProfile } from '@/components/PhotographerProfile';
import { SkeletonCard } from '@/components/SkeletonCard';
import { usePhotographers } from '@/hooks/usePhotographers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Camera, Sparkles, Grid, Filter, Star, Heart, Award } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Index = () => {
  const { 
    photographers, 
    loading, 
    loadingMore, 
    hasMore, 
    loadMore, 
    searchQuery, 
    setSearchQuery, 
    filters, 
    setFilters, 
    totalCount 
  } = usePhotographers();
  const [selectedPhotographer, setSelectedPhotographer] = useState<number | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const selectedPhotographerData = photographers.find(p => p.id === selectedPhotographer);

  if (selectedPhotographer && selectedPhotographerData) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <PhotographerProfile 
            photographer={selectedPhotographerData}
            onBack={() => setSelectedPhotographer(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-orange-400/5 to-red-400/5">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <Star className="w-6 h-6 text-primary/30" />
        </div>
        <div className="absolute top-32 right-20 animate-pulse">
          <Heart className="w-8 h-8 text-red-400/30" />
        </div>
        <div className="absolute bottom-20 left-20 animate-bounce delay-1000">
          <Award className="w-5 h-5 text-orange-400/30" />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            {/* Logo & Brand */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="relative">
                <Camera className="w-12 h-12 text-primary drop-shadow-lg" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full animate-ping"></div>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-orange-400 to-red-400 bg-clip-text text-transparent">
                Pixisphere
              </h1>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Maternity Photographers in{' '}
                <span className="text-primary">Bengaluru</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover the perfect photographer for your special moments. Browse through our curated collection of 
                <span className="text-primary font-semibold"> talented professionals</span> who specialize in capturing life's most precious memories.
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2">
                <Camera className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">25+ Photographers</span>
              </div>
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">4.5+ Average Rating</span>
              </div>
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium">1000+ Happy Clients</span>
              </div>
            </div>
            
            {/* Smart Suggestion */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <Badge variant="outline" className="border-primary/50 text-primary bg-primary/5 px-4 py-2 text-sm">
                🎯 AI Suggestion: Top-rated outdoor maternity photographers in Bengaluru
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name, location, or style..."
          />
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button & Results Count */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Grid className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {loading ? 'Loading...' : `${totalCount} photographers found`}
                  </span>
                </div>
              </div>

              {/* Mobile Filter Toggle */}
              <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <div className="p-6">
                    <FilterSidebar filters={filters} setFilters={setFilters} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Photographer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              ) : photographers.length > 0 ? (
                photographers.map((photographer) => (
                  <PhotographerCard
                    key={photographer.id}
                    photographer={photographer}
                    onViewProfile={setSelectedPhotographer}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Camera className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground">No photographers found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>

            {/* Load More Button */}
            {hasMore && !loading && photographers.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button 
                  onClick={loadMore} 
                  disabled={loadingMore}
                  variant="outline"
                  size="lg"
                  className="bg-card/50 border-border/50 hover:bg-primary hover:text-primary-foreground"
                >
                  {loadingMore ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                      Loading more...
                    </>
                  ) : (
                    <>
                      <Grid className="w-4 h-4 mr-2" />
                      Load More Photographers
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Loading More Skeletons */}
            {loadingMore && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonCard key={`loading-${index}`} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
