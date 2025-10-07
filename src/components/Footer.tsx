"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Linkedin, Twitter, Mail, Phone, MapPin, Clock, Send, Award, Shield, Star } from 'lucide-react';

export const LuxuryFooter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const socialIcons = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  const quickLinks = [
    'Home', 'Apartments', 'Plots', 'About Us', 'Contact',
    'Privacy Policy', 'Terms & Conditions', 'Careers', 'Press Releases', 'Site Map'
  ];

  return (
    <motion.footer
      className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Glass morphism background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-sm" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-yellow-400/5 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-6 py-16">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12"
          variants={containerVariants}
        >
          {/* Column 1 - Company Information */}
          <motion.div className="space-y-6" variants={columnVariants}>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent mb-2">
                Lade Constructions
              </h2>
              <p className="text-yellow-400/80 text-sm font-medium mb-4">
                Luxury Living Redefined
              </p>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Under the visionary leadership of Girish Lade, we craft exceptional residential spaces 
                that blend architectural excellence with modern luxury, creating homes that inspire and endure.
              </p>
            </div>

            <div>
              <h4 className="text-yellow-400 font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                {socialIcons.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    className="w-10 h-10 bg-slate-800/50 border border-slate-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50 hover:bg-yellow-400/10 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Award size={16} className="text-yellow-400" />
                <span className="text-sm">ISO 9001:2015 Certified</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Shield size={16} className="text-yellow-400" />
                <span className="text-sm">RERA Registered Builder</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Star size={16} className="text-yellow-400" />
                <span className="text-sm">Award-winning Projects</span>
              </div>
            </div>
          </motion.div>

          {/* Column 2 - Quick Links */}
          <motion.div className="space-y-6" variants={columnVariants}>
            <h4 className="text-xl font-semibold text-yellow-400 mb-6">Quick Links</h4>
            <div className="grid grid-cols-1 gap-3">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={link}
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 text-sm transition-colors duration-200 hover:translate-x-1"
                  whileHover={{ x: 4 }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 3 - Contact Information */}
          <motion.div className="space-y-6" variants={columnVariants}>
            <h4 className="text-xl font-semibold text-yellow-400 mb-6">Contact Information</h4>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Lade Constructions Pvt Ltd<br />
                    #45, Prestige Meridian II<br />
                    MG Road, Bangalore - 560001<br />
                    Karnataka, India
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone size={16} className="text-yellow-400" />
                  <div>
                    <p className="text-gray-300 text-sm">Sales: +91 98765 43210</p>
                    <p className="text-gray-300 text-sm">Support: +91 98765 43211</p>
                    <p className="text-gray-300 text-sm">Girish Lade: +91 98765 43212</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail size={16} className="text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-gray-300 text-sm">info@ladeconstructions.com</p>
                    <p className="text-gray-300 text-sm">sales@ladeconstructions.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock size={16} className="text-yellow-400" />
                  <div>
                    <p className="text-gray-300 text-sm">Mon - Sat: 9:00 AM - 7:00 PM</p>
                    <p className="text-gray-300 text-sm">Sun: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Column 4 - Newsletter & Updates */}
          <motion.div className="space-y-6" variants={columnVariants}>
            <h4 className="text-xl font-semibold text-yellow-400 mb-6">Stay Updated</h4>
            
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                Get notified about new property launches, luxury home tips, and exclusive offers.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="relative">
                  <motion.input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 focus:bg-slate-800/70 transition-all duration-300"
                    whileFocus={{ scale: 1.02 }}
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubscribed}
                  className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubscribed ? (
                    <>
                      <span>Subscribed!</span>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-4 h-4 bg-green-500 rounded-full"
                      />
                    </>
                  ) : (
                    <>
                      <span>Subscribe Now</span>
                      <Send size={16} />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="space-y-2 text-xs text-gray-400">
                <p>• Property launch notifications</p>
                <p>• Luxury home design tips</p>
                <p>• Exclusive investment opportunities</p>
                <p>• Market insights and trends</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom section with copyright and legal */}
        <motion.div
          className="pt-8 border-t border-slate-700/50"
          variants={columnVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Lade Constructions Pvt Ltd. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Crafting luxury homes since 2010 | RERA Registration: PRM/KA/RERA/1251/446/PR/010823/005931
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-xs text-gray-400">
              <motion.a 
                href="#" 
                className="hover:text-yellow-400 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a 
                href="#" 
                className="hover:text-yellow-400 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Terms of Service
              </motion.a>
              <motion.a 
                href="#" 
                className="hover:text-yellow-400 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Sitemap
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};