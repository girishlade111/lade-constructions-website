"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, Play, Pause } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  designation: string;
  company?: string;
  location: string;
  rating: number;
  testimonial: string;
  image: string;
  projectType: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Sharma",
    designation: "Senior Vice President",
    company: "Tech Mahindra",
    location: "Whitefield, Bangalore",
    rating: 5,
    testimonial: "Girish Lade's personal attention to detail and expertise in luxury construction is unmatched. Our 4BHK apartment with Italian marble flooring and modular kitchen exceeded all expectations. The transparent dealing and timely delivery made this a stress-free experience. The premium amenities and finishing quality truly reflect the luxury standards we were looking for.",
    image: "/api/placeholder/80/80",
    projectType: "Luxury Apartment"
  },
  {
    id: 2,
    name: "Priya Menon",
    designation: "Director of Operations",
    company: "Infosys Limited",
    location: "Electronic City, Bangalore",
    rating: 5,
    testimonial: "Working with Lade Constructions was an absolute pleasure. Girish's commitment to premium quality is evident in every corner of our villa. The German fittings, automated home systems, and landscaped gardens were delivered exactly as promised. His post-delivery support has been exceptional, making us feel truly valued as clients.",
    image: "/api/placeholder/80/80",
    projectType: "Premium Villa"
  },
  {
    id: 3,
    name: "Vikram Agarwal",
    designation: "Managing Partner",
    company: "Agarwal & Associates",
    location: "Koramangala, Bangalore",
    rating: 5,
    testimonial: "The level of craftsmanship and attention to luxury specifications that Girish Lade brings to his projects is remarkable. Our penthouse features imported fixtures, premium wooden flooring, and a state-of-the-art modular kitchen. The transparency in dealings and adherence to timelines made this investment decision absolutely worthwhile.",
    image: "/api/placeholder/80/80",
    projectType: "Luxury Penthouse"
  },
  {
    id: 4,
    name: "Anita Krishnan",
    designation: "Chief Financial Officer",
    company: "Wipro Technologies",
    location: "Sarjapur Road, Bangalore",
    rating: 5,
    testimonial: "Girish's expertise in luxury construction shines through in every aspect of our new home. The premium amenities including the infinity pool, imported marble work, and smart home automation were executed flawlessly. His team's professionalism and commitment to customer service made the entire journey seamless from concept to possession.",
    image: "/api/placeholder/80/80",
    projectType: "Smart Villa"
  },
  {
    id: 5,
    name: "Suresh Reddy",
    designation: "Senior Director",
    company: "Amazon India",
    location: "Bellandur, Bangalore",
    rating: 5,
    testimonial: "Choosing Lade Constructions for our dream home was the best decision we made. Girish Lade's personal involvement and expertise in luxury specifications is evident throughout our villa. The Italian marble bathrooms, premium modular kitchen, and luxury amenities were delivered with impeccable quality. His transparent approach and timely delivery made this a truly premium experience.",
    image: "/api/placeholder/80/80",
    projectType: "Designer Villa"
  },
  {
    id: 6,
    name: "Deepika Iyer",
    designation: "Vice President",
    company: "HDFC Bank",
    location: "HSR Layout, Bangalore",
    rating: 5,
    testimonial: "The luxury and quality that Girish Lade delivers is unparalleled in Bangalore's construction industry. Our apartment features premium finishing with imported tiles, designer lighting, and a fully automated modular kitchen. His team's attention to detail and post-delivery support has been outstanding. Every premium specification was delivered exactly as promised.",
    image: "/api/placeholder/80/80",
    projectType: "Luxury Apartment"
  },
  {
    id: 7,
    name: "Arjun Nair",
    designation: "General Manager",
    company: "Bosch India",
    location: "Marathahalli, Bangalore",
    rating: 5,
    testimonial: "Girish's commitment to premium quality and luxury construction standards is truly exceptional. Our villa showcases imported fixtures, premium granite work, and luxury amenities that exceed international standards. The transparent dealing throughout the project and his personal attention to our requirements made this a remarkable experience. Highly recommend for luxury construction needs.",
    image: "/api/placeholder/80/80",
    projectType: "Executive Villa"
  },
  {
    id: 8,
    name: "Kavitha Srinivasan",
    designation: "Senior Principal",
    company: "Microsoft India",
    location: "Indiranagar, Bangalore",
    rating: 5,
    testimonial: "Working with Lade Constructions and Girish Lade personally has been an extraordinary experience. The luxury specifications including Italian marble, premium wooden flooring, and high-end modular kitchen were executed with perfection. His expertise in premium construction and commitment to timely delivery while maintaining transparency in all dealings makes him the best choice for luxury homes in Bangalore.",
    image: "/api/placeholder/80/80",
    projectType: "Premium Apartment"
  }
];

export const LuxuryTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const StarRating = ({ rating, index }: { rating: number; index: number }) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              delay: index * 0.1 + i * 0.1,
              duration: 0.3,
              type: "spring",
              stiffness: 300
            }}
          >
            <Star
              className={`w-5 h-5 ${
                i < rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-yellow-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Client Testimonials
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"
          />
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Discover what our discerning clients say about their luxury construction experience with Girish Lade and our premium construction services
          </motion.p>
        </motion.div>

        {/* Main Carousel Container */}
        <div 
          className="relative max-w-7xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Auto-play Control */}
          <motion.button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="absolute top-4 right-4 z-20 p-3 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 text-white hover:bg-black/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </motion.button>

          {/* Testimonial Cards */}
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="grid md:grid-cols-2 gap-8"
              >
                {/* Current Testimonial */}
                <motion.div
                  className="relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(255, 215, 0, 0.3)"
                  }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setHoveredCard(currentIndex)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Quote Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="absolute -top-4 -left-4 p-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg"
                  >
                    <Quote className="w-8 h-8 text-slate-900" />
                  </motion.div>

                  {/* Client Info */}
                  <div className="flex items-center mb-6 pt-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="relative"
                    >
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-gradient-to-r from-yellow-400 to-yellow-600"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-yellow-600/20" />
                    </motion.div>
                    <div className="ml-4">
                      <motion.h4
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-xl font-bold text-white"
                      >
                        {testimonials[currentIndex].name}
                      </motion.h4>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="text-gray-300 text-sm"
                      >
                        {testimonials[currentIndex].designation}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="text-yellow-400 text-sm font-medium"
                      >
                        {testimonials[currentIndex].company}
                      </motion.p>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="mb-6"
                  >
                    <StarRating rating={testimonials[currentIndex].rating} index={currentIndex} />
                  </motion.div>

                  {/* Testimonial Text */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-gray-200 leading-relaxed text-lg mb-6"
                  >
                    "{testimonials[currentIndex].testimonial}"
                  </motion.p>

                  {/* Project Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="flex justify-between items-center pt-4 border-t border-white/10"
                  >
                    <span className="text-yellow-400 font-medium">
                      {testimonials[currentIndex].projectType}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {testimonials[currentIndex].location}
                    </span>
                  </motion.div>

                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredCard === currentIndex ? 1 : 0 
                    }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 pointer-events-none"
                  />
                </motion.div>

                {/* Next Testimonial Preview */}
                <motion.div
                  className="relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-lg border border-white/10 shadow-xl opacity-75 hover:opacity-100 transition-all duration-300 cursor-pointer"
                  onClick={nextTestimonial}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px -12px rgba(255, 215, 0, 0.2)"
                  }}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 0.75, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonials[(currentIndex + 1) % testimonials.length].image}
                      alt={testimonials[(currentIndex + 1) % testimonials.length].name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                    />
                    <div className="ml-3">
                      <h5 className="text-white font-semibold">
                        {testimonials[(currentIndex + 1) % testimonials.length].name}
                      </h5>
                      <p className="text-gray-400 text-sm">
                        {testimonials[(currentIndex + 1) % testimonials.length].designation}
                      </p>
                    </div>
                  </div>
                  
                  <StarRating 
                    rating={testimonials[(currentIndex + 1) % testimonials.length].rating} 
                    index={(currentIndex + 1) % testimonials.length}
                  />
                  
                  <p className="text-gray-300 mt-4 line-clamp-4">
                    "{testimonials[(currentIndex + 1) % testimonials.length].testimonial.substring(0, 150)}..."
                  </p>
                  
                  <div className="mt-4 text-yellow-400 text-sm font-medium">
                    Next: {testimonials[(currentIndex + 1) % testimonials.length].projectType}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-12">
            {/* Previous Button */}
            <motion.button
              onClick={prevTestimonial}
              className="flex items-center gap-3 px-6 py-4 rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 text-white hover:from-yellow-400/20 hover:to-yellow-600/20 hover:border-yellow-400/30 transition-all duration-300 group"
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6 group-hover:text-yellow-400 transition-colors" />
              <span className="hidden md:block font-medium">Previous</span>
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={nextTestimonial}
              className="flex items-center gap-3 px-6 py-4 rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 text-white hover:from-yellow-400/20 hover:to-yellow-600/20 hover:border-yellow-400/30 transition-all duration-300 group"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="hidden md:block font-medium">Next</span>
              <ChevronRight className="w-6 h-6 group-hover:text-yellow-400 transition-colors" />
            </motion.button>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 relative">
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600"
                initial={{ width: "0%" }}
                animate={{ 
                  width: isAutoPlaying ? "100%" : `${((currentIndex + 1) / testimonials.length) * 100}%`
                }}
                transition={{ 
                  duration: isAutoPlaying ? 5 : 0.3,
                  ease: "linear"
                }}
                key={currentIndex + (isAutoPlaying ? 'auto' : 'manual')}
              />
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <div className="text-3xl font-bold text-yellow-400 mb-2">500+</div>
            <div className="text-gray-300">Happy Families</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <div className="text-3xl font-bold text-yellow-400 mb-2">100%</div>
            <div className="text-gray-300">On-Time Delivery</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <div className="text-3xl font-bold text-yellow-400 mb-2">4.9/5</div>
            <div className="text-gray-300">Average Rating</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};