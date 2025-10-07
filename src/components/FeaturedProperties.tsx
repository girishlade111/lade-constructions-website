"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Square, Car, Wifi, Waves, Dumbbell, Shield, Building, Star, ArrowRight } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  type: 'apartment' | 'plot';
  image: string;
  price: string;
  location: string;
  status: 'available' | 'sold-out';
  featured: boolean;
  specifications: {
    bedrooms?: number;
    bathrooms?: number;
    sqft: number;
    floor?: string;
    facing?: string;
    plotSize?: string;
  };
  amenities: string[];
  premiumFeatures: string[];
  description: string;
}

const properties: Property[] = [
  {
    id: '1',
    title: 'Skyline Residences Premium',
    type: 'apartment',
    image: '/images/luxury-apartment-1.jpg',
    price: '₹2.8 - 4.2 Cr',
    location: 'Whitefield, Bangalore',
    status: 'available',
    featured: true,
    specifications: {
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2100,
      floor: '15th - 25th',
      facing: 'North-East'
    },
    amenities: ['Swimming Pool', 'Gym & Spa', '24/7 Security', 'Clubhouse', 'Kids Play Area', 'Jogging Track'],
    premiumFeatures: ['Italian Marble Flooring', 'Modular Kitchen', 'High-Speed Elevators', 'Smart Home Features', 'Premium Fittings'],
    description: 'Luxurious 3BHK apartments with panoramic city views and world-class amenities in the heart of IT corridor.'
  },
  {
    id: '2',
    title: 'Golden Gates Villa Plots',
    type: 'plot',
    image: '/images/luxury-plot-1.jpg',
    price: '₹85 - 125 Lakh',
    location: 'Electronic City, Bangalore',
    status: 'available',
    featured: true,
    specifications: {
      sqft: 1200,
      plotSize: '30x40',
      facing: 'East'
    },
    amenities: ['Gated Community', 'Underground Utilities', 'Wide Roads', 'Landscaped Parks', '24/7 Security'],
    premiumFeatures: ['Corner Plots Available', 'Clear Title', 'BMRDA Approved', 'Ready for Construction', 'Premium Location'],
    description: 'Premium residential plots in a gated community with excellent connectivity and modern infrastructure.'
  },
  {
    id: '3',
    title: 'Royal Heights Penthouse',
    type: 'apartment',
    image: '/images/luxury-apartment-2.jpg',
    price: '₹6.5 - 8.2 Cr',
    location: 'Koramangala, Bangalore',
    status: 'available',
    featured: true,
    specifications: {
      bedrooms: 4,
      bathrooms: 4,
      sqft: 3500,
      floor: 'Penthouse',
      facing: 'South-West'
    },
    amenities: ['Private Terrace', 'Swimming Pool', 'Concierge Service', 'Valet Parking', 'Business Center'],
    premiumFeatures: ['Private Elevator', 'Jacuzzi', 'Home Theatre', 'Wine Cellar', 'Panoramic Views'],
    description: 'Ultra-luxury penthouse with private amenities and breathtaking views of the city skyline.'
  },
  {
    id: '4',
    title: 'Emerald Gardens Premium',
    type: 'apartment',
    image: '/images/luxury-apartment-3.jpg',
    price: '₹1.8 - 2.6 Cr',
    location: 'Hebbal, Bangalore',
    status: 'available',
    featured: false,
    specifications: {
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1450,
      floor: '8th - 18th',
      facing: 'North'
    },
    amenities: ['Infinity Pool', 'Gym', 'Yoga Deck', 'Library', 'Café', 'Pet Park'],
    premiumFeatures: ['Floor-to-Ceiling Windows', 'Premium Wooden Flooring', 'Designer Kitchen', 'Smart Lighting'],
    description: 'Contemporary 2BHK apartments surrounded by lush greenery with modern lifestyle amenities.'
  },
  {
    id: '5',
    title: 'Platinum Enclave Villas',
    type: 'plot',
    image: '/images/luxury-plot-2.jpg',
    price: '₹1.2 - 1.8 Cr',
    location: 'Sarjapur Road, Bangalore',
    status: 'sold-out',
    featured: true,
    specifications: {
      sqft: 2400,
      plotSize: '40x60',
      facing: 'North'
    },
    amenities: ['Clubhouse', 'Swimming Pool', 'Tennis Court', 'Gym', 'Kids Zone', 'Amphitheatre'],
    premiumFeatures: ['Villa Plots', 'Premium Corner Sites', 'RERA Approved', 'Park Facing', 'Wide Roads'],
    description: 'Exclusive villa plots in a premium gated community with resort-style amenities and facilities.'
  },
  {
    id: '6',
    title: 'Metropolitan Towers',
    type: 'apartment',
    image: '/images/luxury-apartment-4.jpg',
    price: '₹3.2 - 4.8 Cr',
    location: 'UB City, Bangalore',
    status: 'available',
    featured: false,
    specifications: {
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2650,
      floor: '20th - 35th',
      facing: 'East'
    },
    amenities: ['Sky Deck', 'Infinity Pool', 'Spa & Wellness', 'Fine Dining', 'Business Lounge'],
    premiumFeatures: ['Marble Bathrooms', 'Imported Fixtures', 'Central AC', 'Home Automation', 'Premium Views'],
    description: 'Sophisticated apartments in the city center with luxury amenities and unparalleled connectivity.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const PropertyCard: React.FC<{ property: Property; index: number }> = ({ property, index }) => {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative"
    >
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
        {/* Glass morphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Status and Featured Badges */}
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          {property.featured && (
            <motion.div 
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm"
            >
              <Star className="w-3 h-3 inline mr-1" />
              FEATURED
            </motion.div>
          )}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${
              property.status === 'available' 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                : 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
            }`}
          >
            {property.status === 'available' ? 'AVAILABLE' : 'SOLD OUT'}
          </motion.div>
        </div>

        {/* Property Image */}
        <div className="relative h-64 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <img 
            src={property.image} 
            alt={property.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute bottom-4 left-4 z-20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="flex items-center gap-1 text-sm">
              <MapPin className="w-4 h-4" />
              {property.location}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title and Price */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors duration-300">
              {property.title}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {property.price}
              </p>
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{property.location}</span>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100">
            {property.specifications.bedrooms && (
              <div className="flex items-center gap-2">
                <Bed className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">{property.specifications.bedrooms} BHK</span>
              </div>
            )}
            {property.specifications.bathrooms && (
              <div className="flex items-center gap-2">
                <Bath className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">{property.specifications.bathrooms} Bath</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Square className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">{property.specifications.sqft} sq ft</span>
            </div>
            {property.specifications.floor && (
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">{property.specifications.floor}</span>
              </div>
            )}
          </div>

          {/* Premium Features */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-900">Premium Features</h4>
            <div className="flex flex-wrap gap-1">
              {property.premiumFeatures.slice(0, 3).map((feature, idx) => (
                <span 
                  key={idx}
                  className="bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-800 px-2 py-1 rounded-md text-xs border border-amber-200"
                >
                  {feature}
                </span>
              ))}
              {property.premiumFeatures.length > 3 && (
                <span className="text-amber-600 text-xs px-2 py-1">
                  +{property.premiumFeatures.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Amenities Preview */}
          <div className="flex items-center gap-4 text-gray-600">
            {property.amenities.includes('Swimming Pool') && <Waves className="w-4 h-4" />}
            {property.amenities.includes('Gym') && <Dumbbell className="w-4 h-4" />}
            {property.amenities.includes('24/7 Security') && <Shield className="w-4 h-4" />}
            {property.amenities.includes('Valet Parking') && <Car className="w-4 h-4" />}
            {property.amenities.includes('Wifi') && <Wifi className="w-4 h-4" />}
            <span className="text-xs text-gray-500">+{property.amenities.length - 5} amenities</span>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
            disabled={property.status === 'sold-out'}
          >
            {property.status === 'available' ? (
              <>
                View Details
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </>
            ) : (
              'Sold Out'
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export const FeaturedProperties: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-6 py-2 rounded-full text-sm font-bold mb-6"
          >
            ✨ LUXURY COLLECTION
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Properties</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium apartments and plots in Bangalore's most sought-after locations
          </p>
        </motion.div>

        {/* Properties Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {properties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
          >
            View All Properties
            <ArrowRight className="w-5 h-5 inline ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};