"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Bed, Bath, Square, Car, CheckCircle, Clock, Eye, Filter } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  location: string;
  area: string;
  price: string;
  image: string;
  gallery: string[];
  type: string;
  status: 'available' | 'sold-out';
  specifications: {
    bedrooms?: number;
    bathrooms?: number;
    balconies?: number;
    floor?: string;
    builtUpArea?: string;
    carpetArea?: string;
    facing?: string;
    plotSize?: string;
  };
  features: string[];
  amenities: string[];
  interiors: string[];
  utilities: string[];
  badge?: string;
}

interface FilterableListingsProps {
  title: string;
  description: string;
  propertyType: 'apartment' | 'plot';
}

const luxuryApartments: Property[] = [
  {
    id: 'apt-1',
    title: 'Prestige Skyline Residences',
    location: 'Whitefield, Bangalore',
    area: 'Near Tech Parks',
    price: '₹1.2 - 2.8 Cr',
    image: '/api/placeholder/600/400',
    gallery: ['/api/placeholder/600/400', '/api/placeholder/600/400', '/api/placeholder/600/400'],
    type: '2 BHK',
    status: 'available',
    specifications: {
      bedrooms: 2,
      bathrooms: 2,
      balconies: 1,
      floor: '12th Floor',
      builtUpArea: '1,250 sq ft',
      carpetArea: '980 sq ft',
      facing: 'East'
    },
    features: ['Italian Marble Flooring', 'Modular Kitchen', 'Premium Fixtures', 'Smart Home Integration'],
    amenities: ['Swimming Pool', 'Gym & Spa', '24/7 Security', 'Clubhouse', 'Children\'s Play Area'],
    interiors: ['Granite Countertops', 'Built-in Wardrobes', 'Designer Lighting', 'Premium Tiles'],
    utilities: ['24/7 Water Supply', 'Gas Pipeline', 'Power Backup', 'High-Speed Internet'],
    badge: 'Premium'
  },
  {
    id: 'apt-2',
    title: 'Elite Garden Towers',
    location: 'Koramangala, Bangalore',
    area: 'Premium Locality',
    price: '₹2.1 - 3.5 Cr',
    image: '/api/placeholder/600/400',
    gallery: ['/api/placeholder/600/400', '/api/placeholder/600/400', '/api/placeholder/600/400'],
    type: '3 BHK',
    status: 'available',
    specifications: {
      bedrooms: 3,
      bathrooms: 3,
      balconies: 2,
      floor: '8th Floor',
      builtUpArea: '1,850 sq ft',
      carpetArea: '1,450 sq ft',
      facing: 'North-East'
    },
    features: ['Marble Flooring', 'Island Kitchen', 'Walk-in Closets', 'Premium Bathroom Fittings'],
    amenities: ['Infinity Pool', 'Sky Lounge', 'Concierge Service', 'Private Elevator', 'Rooftop Garden'],
    interiors: ['Quartz Countertops', 'Custom Cabinetry', 'Chandelier Lighting', 'Imported Tiles'],
    utilities: ['Borewell Water', 'CNG Pipeline', 'Solar Backup', 'Fiber Internet'],
    badge: 'Luxury'
  },
  {
    id: 'apt-3',
    title: 'Royal Heritage Homes',
    location: 'HSR Layout, Bangalore',
    area: 'IT Corridor',
    price: '₹85 Lakh - 1.4 Cr',
    image: '/api/placeholder/600/400',
    gallery: ['/api/placeholder/600/400', '/api/placeholder/600/400', '/api/placeholder/600/400'],
    type: '1 BHK',
    status: 'available',
    specifications: {
      bedrooms: 1,
      bathrooms: 1,
      balconies: 1,
      floor: '5th Floor',
      builtUpArea: '720 sq ft',
      carpetArea: '580 sq ft',
      facing: 'South'
    },
    features: ['Wooden Flooring', 'Compact Kitchen', 'French Windows', 'Modern Fixtures'],
    amenities: ['Swimming Pool', 'Fitness Center', 'Security', 'Visitor Parking', 'Landscaped Gardens'],
    interiors: ['Laminate Counters', 'Built-in Storage', 'LED Lighting', 'Ceramic Tiles'],
    utilities: ['Treated Water', 'LPG Pipeline', 'Inverter Backup', 'Cable Ready'],
    badge: 'Starter Home'
  },
  {
    id: 'apt-4',
    title: 'Pinnacle Luxury Suites',
    location: 'Indiranagar, Bangalore',
    area: 'Central Business District',
    price: '₹3.2 - 4.8 Cr',
    image: '/api/placeholder/600/400',
    gallery: ['/api/placeholder/600/400', '/api/placeholder/600/400', '/api/placeholder/600/400'],
    type: '3 BHK',
    status: 'sold-out',
    specifications: {
      bedrooms: 3,
      bathrooms: 4,
      balconies: 2,
      floor: 'Penthouse',
      builtUpArea: '2,400 sq ft',
      carpetArea: '1,950 sq ft',
      facing: 'West'
    },
    features: ['Premium Marble', 'Designer Kitchen', 'Master Suite', 'Private Terrace'],
    amenities: ['Private Pool', 'Butler Service', 'Valet Parking', 'Wine Cellar', 'Private Gym'],
    interiors: ['Imported Marble', 'Designer Wardrobes', 'Crystal Lighting', 'Premium Appliances'],
    utilities: ['Treated Water', 'Centralized AC', 'Generator Backup', 'Smart Home System']
  }
];

const luxuryPlots: Property[] = [
  {
    id: 'plot-1',
    title: 'Green Valley Estates',
    location: 'Sarjapur Road, Bangalore',
    area: 'Emerging IT Hub',
    price: '₹45 - 85 Lakh',
    image: '/api/placeholder/600/400',
    gallery: ['/api/placeholder/600/400', '/api/placeholder/600/400', '/api/placeholder/600/400'],
    type: 'Residential Plot',
    status: 'available',
    specifications: {
      plotSize: '1,200 - 2,400 sq ft'
    },
    features: ['Clear Title', 'RERA Approved', 'Gated Community', 'Ready to Construct'],
    amenities: ['Clubhouse', 'Security', 'Landscaping', 'Underground Utilities', 'Wide Roads'],
    interiors: [],
    utilities: ['Water Connection', 'Electricity', 'Sewage System', 'Street Lighting'],
    badge: 'Investment'
  },
  {
    id: 'plot-2',
    title: 'Premium Lake View Plots',
    location: 'Kanakapura Road, Bangalore',
    area: 'Lake Facing',
    price: '₹1.2 - 2.5 Cr',
    image: '/api/placeholder/600/400',
    gallery: ['/api/placeholder/600/400', '/api/placeholder/600/400', '/api/placeholder/600/400'],
    type: 'Premium Plot',
    status: 'available',
    specifications: {
      plotSize: '3,000 - 6,000 sq ft'
    },
    features: ['Lake View', 'Premium Location', 'Vastu Compliant', 'Investment Grade'],
    amenities: ['Lake Access', 'Boating Club', 'Resort Facilities', 'Nature Trails', 'Security'],
    interiors: [],
    utilities: ['Borewell Rights', 'Three Phase Power', 'Storm Water Drains', 'Fiber Ready'],
    badge: 'Premium Location'
  },
  {
    id: 'plot-3',
    title: 'Metro Connect Plots',
    location: 'Electronic City, Bangalore',
    area: 'Metro Connectivity',
    price: '₹65 Lakh - 1.1 Cr',
    image: '/api/placeholder/600/400',
    gallery: ['/api/placeholder/600/400', '/api/placeholder/600/400', '/api/placeholder/600/400'],
    type: 'Residential Plot',
    status: 'sold-out',
    specifications: {
      plotSize: '1,500 - 2,200 sq ft'
    },
    features: ['Metro Proximity', 'IT Hub Access', 'Developed Infrastructure', 'Appreciation Potential'],
    amenities: ['Metro Station', 'Shopping Complex', 'Schools', 'Hospitals', 'Parks'],
    interiors: [],
    utilities: ['BWSSB Water', 'BESCOM Power', 'Sewage Treatment', 'High Speed Internet']
  }
];

export const FilterableListings = ({ title, description, propertyType }: FilterableListingsProps) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const properties = propertyType === 'apartment' ? luxuryApartments : luxuryPlots;
  
  const filters = propertyType === 'apartment' 
    ? ['All', '1 BHK', '2 BHK', '3 BHK', 'Available', 'Sold Out']
    : ['All', 'Available', 'Sold Out', 'Premium Locations'];

  const filteredProperties = useMemo(() => {
    let filtered = properties;

    // Apply filter
    if (activeFilter !== 'All') {
      if (activeFilter === 'Available') {
        filtered = filtered.filter(p => p.status === 'available');
      } else if (activeFilter === 'Sold Out') {
        filtered = filtered.filter(p => p.status === 'sold-out');
      } else if (activeFilter === 'Premium Locations') {
        filtered = filtered.filter(p => p.badge === 'Premium Location');
      } else {
        filtered = filtered.filter(p => p.type.includes(activeFilter));
      }
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.area.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [properties, activeFilter, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-50" />
        <div className="container relative z-10 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
              {title}
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl"
        >
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search properties by name, location, or area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 mr-4">
              <Filter className="w-5 h-5 text-amber-400" />
              <span className="text-slate-300 font-medium">Filter by:</span>
            </div>
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/20'
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Properties Grid */}
      <div className="container pb-24">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  layout: { duration: 0.3 }
                }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProperty(property)}
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500">
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {property.badge && (
                        <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-full">
                          {property.badge}
                        </span>
                      )}
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        property.status === 'available'
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}>
                        {property.status === 'available' ? 'Available' : 'Sold Out'}
                      </span>
                    </div>

                    {/* Quick View Button */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-display font-semibold text-white group-hover:text-amber-400 transition-colors">
                        {property.title}
                      </h3>
                      <span className="text-2xl font-bold text-amber-400">
                        {property.price}
                      </span>
                    </div>

                    <div className="flex items-center text-slate-300 mb-4">
                      <MapPin className="w-4 h-4 mr-2 text-amber-400" />
                      <span className="text-sm">{property.location}</span>
                      <span className="mx-2">•</span>
                      <span className="text-sm">{property.area}</span>
                    </div>

                    {/* Specifications */}
                    {propertyType === 'apartment' && (
                      <div className="flex items-center gap-4 text-sm text-slate-300 mb-4">
                        {property.specifications.bedrooms && (
                          <div className="flex items-center gap-1">
                            <Bed className="w-4 h-4" />
                            <span>{property.specifications.bedrooms} Bed</span>
                          </div>
                        )}
                        {property.specifications.bathrooms && (
                          <div className="flex items-center gap-1">
                            <Bath className="w-4 h-4" />
                            <span>{property.specifications.bathrooms} Bath</span>
                          </div>
                        )}
                        {property.specifications.builtUpArea && (
                          <div className="flex items-center gap-1">
                            <Square className="w-4 h-4" />
                            <span>{property.specifications.builtUpArea}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {propertyType === 'plot' && property.specifications.plotSize && (
                      <div className="flex items-center gap-1 text-sm text-slate-300 mb-4">
                        <Square className="w-4 h-4" />
                        <span>{property.specifications.plotSize}</span>
                      </div>
                    )}

                    {/* Features Preview */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.features.slice(0, 2).map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-white/10 text-slate-300 text-xs rounded-md border border-white/20"
                        >
                          {feature}
                        </span>
                      ))}
                      {property.features.length > 2 && (
                        <span className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-md">
                          +{property.features.length - 2} more
                        </span>
                      )}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredProperties.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-display font-semibold text-white mb-2">
              No properties found
            </h3>
            <p className="text-slate-400">
              Try adjusting your filters or search terms
            </p>
          </motion.div>
        )}
      </div>

      {/* Property Detail Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProperty(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative">
                <img
                  src={selectedProperty.image}
                  alt={selectedProperty.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                >
                  ×
                </button>
                <div className="absolute bottom-6 left-6">
                  <h2 className="text-3xl font-display font-bold text-white mb-2">
                    {selectedProperty.title}
                  </h2>
                  <div className="flex items-center text-slate-300">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{selectedProperty.location}</span>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div>
                    <h3 className="text-2xl font-display font-semibold text-white mb-4">
                      Specifications
                    </h3>
                    <div className="space-y-3 mb-8">
                      {Object.entries(selectedProperty.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-slate-700">
                          <span className="text-slate-400 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="text-white">{value}</span>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-2xl font-display font-semibold text-white mb-4">
                      Premium Features
                    </h3>
                    <div className="grid grid-cols-1 gap-2 mb-8">
                      {selectedProperty.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl p-6 mb-8">
                      <h3 className="text-3xl font-display font-bold text-white mb-2">
                        {selectedProperty.price}
                      </h3>
                      <p className="text-slate-300 mb-4">Starting price</p>
                      <div className="flex gap-3">
                        <button className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl hover:shadow-lg transition-all">
                          Schedule Visit
                        </button>
                        <button className="flex-1 py-3 bg-white/10 text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                          Download Brochure
                        </button>
                      </div>
                    </div>

                    <h3 className="text-xl font-display font-semibold text-white mb-4">
                      Luxury Amenities
                    </h3>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {selectedProperty.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-amber-400" />
                          <span className="text-slate-300 text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>

                    {selectedProperty.utilities.length > 0 && (
                      <>
                        <h3 className="text-xl font-display font-semibold text-white mb-4">
                          Utilities & Services
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedProperty.utilities.map((utility, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-blue-400" />
                              <span className="text-slate-300 text-sm">{utility}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};