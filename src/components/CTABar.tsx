"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Download, Phone, Loader2 } from 'lucide-react';

interface CTAAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  variant: 'primary' | 'secondary' | 'tertiary';
  onClick: () => void;
}

interface CTABarProps {
  className?: string;
  onScheduleVisit?: () => void;
  onDownloadBrochure?: () => void;
  onRequestCallback?: () => void;
}

export const CTABar: React.FC<CTABarProps> = ({
  className = '',
  onScheduleVisit,
  onDownloadBrochure,
  onRequestCallback,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show CTA bar when user has scrolled past 20% of the page
      const showThreshold = windowHeight * 0.2;
      // Hide when near footer (within 150px)
      const hideThreshold = documentHeight - windowHeight - 150;
      
      setIsVisible(scrollPosition > showThreshold && scrollPosition < hideThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleActionClick = async (actionId: string, callback?: () => void) => {
    if (!callback) return;
    
    setLoadingStates(prev => ({ ...prev, [actionId]: true }));
    
    try {
      await callback();
      // Simulate async action
      await new Promise(resolve => setTimeout(resolve, 800));
    } catch (error) {
      console.error('CTA action failed:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [actionId]: false }));
    }
  };

  const ctaActions: CTAAction[] = [
    {
      id: 'schedule',
      label: 'Schedule a Site Visit',
      icon: Calendar,
      variant: 'primary',
      onClick: () => handleActionClick('schedule', onScheduleVisit),
    },
    {
      id: 'download',
      label: 'Download Brochure',
      icon: Download,
      variant: 'secondary',
      onClick: () => handleActionClick('download', onDownloadBrochure),
    },
    {
      id: 'callback',
      label: 'Get a Call Back',
      icon: Phone,
      variant: 'tertiary',
      onClick: () => handleActionClick('callback', onRequestCallback),
    },
  ];

  const getButtonStyles = (variant: 'primary' | 'secondary' | 'tertiary') => {
    const baseStyles = "relative group px-8 py-4 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-3 overflow-hidden backdrop-blur-sm border";
    
    switch (variant) {
      case 'primary':
        return `${baseStyles} bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-slate-900 border-amber-300/30 hover:from-amber-300 hover:via-yellow-200 hover:to-amber-300 shadow-lg hover:shadow-xl hover:shadow-amber-400/25`;
      case 'secondary':
        return `${baseStyles} bg-slate-800/80 text-amber-300 border-amber-300/40 hover:bg-slate-700/90 hover:border-amber-300/60 shadow-lg hover:shadow-xl hover:shadow-slate-900/25`;
      case 'tertiary':
        return `${baseStyles} bg-transparent text-amber-300 border-amber-300/30 hover:bg-amber-300/5 hover:border-amber-300/50 shadow-md hover:shadow-lg`;
    }
  };

  const ActionButton: React.FC<{ action: CTAAction; index: number }> = ({ action, index }) => {
    const Icon = action.icon;
    const isLoading = loadingStates[action.id];

    return (
      <motion.button
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ 
          duration: 0.4, 
          delay: index * 0.1,
          type: "spring",
          stiffness: 100
        }}
        whileHover={{ 
          scale: 1.05,
          y: -2,
        }}
        whileTap={{ scale: 0.98 }}
        onClick={action.onClick}
        disabled={isLoading}
        className={getButtonStyles(action.variant)}
      >
        {/* Background overlay for hover effects */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
          initial={false}
          animate={{ x: isLoading ? [-100, 100] : -100 }}
          transition={{ 
            duration: isLoading ? 1.5 : 0.6,
            repeat: isLoading ? Infinity : 0,
            ease: "linear"
          }}
        />
        
        {/* Icon container */}
        <motion.div
          className="relative z-10"
          animate={{ 
            rotate: isLoading ? 360 : 0,
            scale: isLoading ? 0.8 : 1
          }}
          transition={{ 
            duration: isLoading ? 1 : 0.2,
            repeat: isLoading ? Infinity : 0,
            ease: isLoading ? "linear" : "easeOut"
          }}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5" />
          ) : (
            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          )}
        </motion.div>
        
        {/* Label */}
        <span className="relative z-10 hidden sm:inline whitespace-nowrap">
          {action.label}
        </span>
        
        {/* Mobile label (shorter) */}
        <span className="relative z-10 sm:hidden whitespace-nowrap">
          {action.label.split(' ')[0]}
        </span>
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
          animate={{ x: [-200, 200] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut"
          }}
        />
      </motion.button>
    );
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 20,
            duration: 0.6
          }}
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 ${className}`}
        >
          {/* Main container */}
          <div className="relative">
            {/* Background with glass morphism */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-2xl border border-amber-300/20 shadow-2xl" />
            
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-10 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-300/10 to-transparent" />
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(251, 191, 36, 0.15) 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }}
              />
            </div>
            
            {/* Content */}
            <div className="relative px-6 py-4 lg:px-8 lg:py-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-8">
                {/* Title section - hidden on mobile for space */}
                <motion.div 
                  className="hidden lg:block text-center sm:text-left"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <h3 className="text-lg font-semibold text-amber-300 mb-1">
                    Ready to Build Your Dream?
                  </h3>
                  <p className="text-sm text-slate-300">
                    Take the next step with Lade Constructions
                  </p>
                </motion.div>
                
                {/* Divider - hidden on mobile */}
                <motion.div 
                  className="hidden lg:block w-px h-12 bg-gradient-to-b from-transparent via-amber-300/30 to-transparent"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                />
                
                {/* CTA Buttons */}
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 sm:gap-4">
                  {ctaActions.map((action, index) => (
                    <ActionButton 
                      key={action.id} 
                      action={action} 
                      index={index} 
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Glow effect */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 via-yellow-300/20 to-amber-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100"
              animate={{ 
                opacity: [0, 0.5, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};