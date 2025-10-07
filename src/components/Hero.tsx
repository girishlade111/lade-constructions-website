"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Award, Users, Home, Calendar } from 'lucide-react';

interface HeroProps {
  variant?: 'full' | 'compact';
  backgroundImage?: string;
  backgroundVideo?: string;
}

const useCountUp = (end: number, duration: number = 3, startWhen: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startWhen) return;

    let startTime: number;
    const startCount = 0;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(startCount + (end - startCount) * easeOutCubic));
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration, startWhen]);

  return count;
};

export const LuxuryHero: React.FC<HeroProps> = ({ 
  variant = 'full',
  backgroundImage = '/api/placeholder/1920/1080',
  backgroundVideo 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1500], [0, -500]);
  
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  
  const experienceCount = useCountUp(25, 2.5, isStatsInView);
  const projectsCount = useCountUp(450, 3, isStatsInView);
  const familiesCount = useCountUp(1200, 3.5, isStatsInView);

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const statCardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    initial: { scale: 1, boxShadow: "0 10px 30px rgba(255, 42, 42, 0.2)" },
    hover: { 
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(255, 42, 42, 0.4)",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    tap: { scale: 0.98 }
  };

  const secondaryButtonVariants = {
    initial: { scale: 1, boxShadow: "0 10px 30px rgba(243, 214, 180, 0.2)" },
    hover: { 
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(243, 214, 180, 0.4)",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    tap: { scale: 0.98 }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${variant === 'full' ? 'min-h-screen' : 'min-h-[80vh]'} flex items-center justify-center`}
    >
      {/* Background with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        {backgroundVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${backgroundImage})`
            }}
          />
        )}
        
        {/* Premium Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Glass Morphism Overlay */}
        <div className="absolute inset-0 backdrop-blur-[2px] bg-gradient-to-r from-slate-900/20 via-transparent to-slate-900/20" />
      </motion.div>

      {/* Luxury Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="absolute top-8 right-8 z-20"
      >
        <div className="px-6 py-3 bg-gradient-to-r from-amber-400/20 to-yellow-300/20 backdrop-blur-md border border-amber-300/30 rounded-full">
          <span className="text-amber-200 font-medium text-sm tracking-wide">
            Founded by Girish Lade
          </span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Main Heading */}
          <motion.div variants={textVariants} className="space-y-4">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-display font-bold text-white leading-none tracking-tight">
              <span className="block">Lade</span>
              <span className="block bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
                Constructions
              </span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.div variants={textVariants}>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 font-light max-w-4xl mx-auto leading-relaxed tracking-wide">
              Crafting Legacies, Building Dreams
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={textVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl border border-red-500/50 backdrop-blur-sm flex items-center gap-3 text-lg"
            >
              Explore Our Properties
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>

            <motion.button
              variants={secondaryButtonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="group px-8 py-4 bg-gradient-to-r from-amber-400/10 to-yellow-300/10 text-amber-200 font-semibold rounded-xl border border-amber-300/30 backdrop-blur-md flex items-center gap-3 text-lg"
            >
              Discover Prime Plots
              <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 lg:mt-32"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Years of Experience */}
            <motion.div
              variants={statCardVariants}
              initial="hidden"
              animate={isStatsInView ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
              className="group p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-amber-300/30 transition-all duration-500"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-amber-400/20 to-yellow-300/20 rounded-full">
                  <Award className="w-8 h-8 text-amber-300" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {experienceCount}+
                </h3>
                <p className="text-gray-300 font-medium">Years of Excellence</p>
              </div>
            </motion.div>

            {/* Projects Completed */}
            <motion.div
              variants={statCardVariants}
              initial="hidden"
              animate={isStatsInView ? "visible" : "hidden"}
              transition={{ delay: 0.4 }}
              className="group p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-amber-300/30 transition-all duration-500"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-amber-400/20 to-yellow-300/20 rounded-full">
                  <Home className="w-8 h-8 text-amber-300" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {projectsCount}+
                </h3>
                <p className="text-gray-300 font-medium">Projects Delivered</p>
              </div>
            </motion.div>

            {/* Happy Families */}
            <motion.div
              variants={statCardVariants}
              initial="hidden"
              animate={isStatsInView ? "visible" : "hidden"}
              transition={{ delay: 0.6 }}
              className="group p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-amber-300/30 transition-all duration-500"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-amber-400/20 to-yellow-300/20 rounded-full">
                  <Users className="w-8 h-8 text-amber-300" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {familiesCount}+
                </h3>
                <p className="text-gray-300 font-medium">Happy Families</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </div>
  );
};