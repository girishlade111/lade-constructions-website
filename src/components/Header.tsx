"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  className?: string;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  className = '', 
  currentPage = 'home',
  onNavigate 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', id: 'home' },
    { name: 'Apartments', id: 'apartments' },
    { name: 'Plots', id: 'plots' },
    { name: 'About Us', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (pageId: string) => {
    if (onNavigate) {
      onNavigate(pageId);
    }
    setIsMobileMenuOpen(false);
  };

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const mobileMenuVariants = {
    closed: {
      x: '100%',
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const menuItemVariants = {
    closed: { x: 20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${className}`}
    >
      {/* Glass morphism background */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isScrolled
            ? 'bg-slate-900/95 backdrop-blur-xl shadow-2xl'
            : 'bg-slate-900/20 backdrop-blur-md'
        }`}
      />
      
      {/* Gradient border */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent transition-opacity duration-500 ${
          isScrolled ? 'opacity-100' : 'opacity-30'
        }`}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavigate('home')}
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(251, 191, 36, 0.3)',
                  '0 0 30px rgba(251, 191, 36, 0.5)',
                  '0 0 20px rgba(251, 191, 36, 0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center"
            >
              <span className="text-slate-900 font-bold text-xl font-serif">L</span>
            </motion.div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-white">
                Lade
                <span className="text-amber-400 ml-1">Constructions</span>
              </h1>
              <p className="text-xs text-slate-400 font-light tracking-wider">
                LUXURY LIVING REDEFINED
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className="relative group"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
              >
                <span className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                  currentPage === item.id
                    ? 'text-amber-400'
                    : 'text-slate-300 group-hover:text-white'
                }`}>
                  {item.name}
                </span>
                
                {/* Hover underline */}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                  initial={{ scaleX: currentPage === item.id ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors duration-300"
            >
              Login
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 10px 30px rgba(251, 191, 36, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Sign Up
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-300 hover:text-white transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-80 bg-slate-900/95 backdrop-blur-xl border-l border-slate-700/50 md:hidden"
            >
              <div className="p-6">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                      <span className="text-slate-900 font-bold text-lg font-serif">L</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-serif font-bold text-white">
                        Lade
                        <span className="text-amber-400 ml-1">Constructions</span>
                      </h2>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-slate-800/50 text-slate-300 hover:text-white transition-colors duration-300"
                  >
                    <X size={20} />
                  </motion.button>
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-4 mb-8">
                  {navigationItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      custom={index}
                      variants={menuItemVariants}
                      onClick={() => handleNavigate(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                        currentPage === item.id
                          ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </nav>

                {/* Mobile Auth Buttons */}
                <motion.div
                  custom={navigationItems.length}
                  variants={menuItemVariants}
                  className="space-y-3"
                >
                  <button className="w-full px-4 py-3 text-slate-300 hover:text-white transition-colors duration-300 text-left">
                    Login
                  </button>
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Sign Up
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};