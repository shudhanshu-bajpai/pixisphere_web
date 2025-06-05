import { useState, useEffect } from 'react';
import { Photographer, FilterState } from '@/types/photographer';


export const usePhotographers = () => {
  const [photographers, setPhotographers] = useState<Photographer[]>([]);
  const [filteredPhotographers, setFilteredPhotographers] = useState<Photographer[]>([]);
  const [displayedPhotographers, setDisplayedPhotographers] = useState<Photographer[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 20000],
    rating: 0,
    styles: [],
    city: '',
    sortBy: 'rating'
  });

// https://verbena-sunrise-situation.glitch.me/photographers

  const ITEMS_PER_PAGE = 6;
useEffect(() => {
    fetch("https://mocki.io/v1/ea3d2929-9445-4855-b48d-cb51019a69e2")
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setPhotographers(data.photographers);
        setLoading(false);
      })
  }, []);

  useEffect(() => {
    const filtered = photographers.filter(photographer => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        photographer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photographer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photographer.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Price filter
      const matchesPrice = photographer.price >= filters.priceRange[0] && 
        photographer.price <= filters.priceRange[1];

      // Rating filter
      const matchesRating = photographer.rating >= filters.rating;

      // Style filter
      const matchesStyle = filters.styles.length === 0 || 
        filters.styles.some(style => photographer.styles.includes(style));

      // City filter
      const matchesCity = filters.city === '' || photographer.location === filters.city;

      return matchesSearch && matchesPrice && matchesRating && matchesStyle && matchesCity;
    });

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'recent':
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    setFilteredPhotographers(filtered);
    setCurrentPage(1);
    setDisplayedPhotographers(filtered.slice(0, ITEMS_PER_PAGE));
    setHasMore(filtered.length > ITEMS_PER_PAGE);
  }, [photographers, searchQuery, filters]);

  const loadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = nextPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE;
      const endIndex = nextPage * ITEMS_PER_PAGE;
      const newItems = filteredPhotographers.slice(startIndex, endIndex);
      
      setDisplayedPhotographers(prev => [...prev, ...newItems]);
      setCurrentPage(nextPage);
      setHasMore(endIndex < filteredPhotographers.length);
      setLoadingMore(false);
    }, 800);
  };

  return {
    photographers: displayedPhotographers,
    loading,
    loadingMore,
    hasMore,
    loadMore,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    totalCount: filteredPhotographers.length
  };
};
