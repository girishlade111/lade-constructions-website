"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar, 
  Download, 
  PhoneCall,
  CheckCircle,
  Loader2,
  User,
  MessageSquare,
  DollarSign,
  Home,
  AlertCircle
} from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  propertyInterest: string;
  budgetRange: string;
  message: string;
  contactMethod: string;
  preferredTime: string;
}

interface FormErrors {
  [key: string]: string;
}

export const LuxuryContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    propertyInterest: '',
    budgetRange: '',
    message: '',
    contactMethod: 'call',
    preferredTime: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const propertyOptions = [
    { value: '1bhk', label: '1 BHK Apartment' },
    { value: '2bhk', label: '2 BHK Apartment' },
    { value: '3bhk', label: '3 BHK Apartment' },
    { value: 'plots', label: 'Residential Plots' }
  ];

  const budgetRanges = [
    { value: '30-50', label: '₹30L - ₹50L' },
    { value: '50-75', label: '₹50L - ₹75L' },
    { value: '75-100', label: '₹75L - ₹1Cr' },
    { value: '100-150', label: '₹1Cr - ₹1.5Cr' },
    { value: '150+', label: '₹1.5Cr+' }
  ];

  const timeSlots = [
    { value: 'morning', label: 'Morning (9 AM - 12 PM)' },
    { value: 'afternoon', label: 'Afternoon (12 PM - 5 PM)' },
    { value: 'evening', label: 'Evening (5 PM - 8 PM)' },
    { value: 'anytime', label: 'Anytime' }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        propertyInterest: '',
        budgetRange: '',
        message: '',
        contactMethod: 'call',
        preferredTime: ''
      });
    }, 3000);
  };

  const handleQuickAction = async (action: string) => {
    if (action === 'download') {
      // Handle brochure download
      console.log('Downloading brochure...');
    } else if (action === 'callback') {
      // Handle callback request
      console.log('Requesting callback...');
    } else if (action === 'visit') {
      // Handle site visit scheduling
      console.log('Scheduling site visit...');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const inputVariants = {
    focused: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    unfocused: {
      scale: 1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
            Get In <span className="text-amber-400">Touch</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Ready to find your dream home? Our luxury properties team is here to guide you 
            through every step of your journey.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center py-16"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="inline-flex items-center justify-center w-24 h-24 bg-green-500/20 rounded-full mb-6"
                    >
                      <CheckCircle className="w-12 h-12 text-green-400" />
                    </motion.div>
                    <h3 className="text-3xl font-display font-bold text-white mb-4">
                      Thank You!
                    </h3>
                    <p className="text-slate-300 text-lg">
                      We've received your inquiry and will contact you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                    <div className="mb-8">
                      <h2 className="text-3xl font-display font-bold text-white mb-3">
                        Contact Information
                      </h2>
                      <p className="text-slate-300">
                        Fill out the form below and we'll get back to you shortly.
                      </p>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleQuickAction('visit')}
                        className="flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold py-4 px-6 rounded-xl transition-all duration-300"
                      >
                        <Calendar className="w-5 h-5" />
                        Schedule Visit
                      </motion.button>
                      
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleQuickAction('callback')}
                        className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-xl border border-white/20 transition-all duration-300"
                      >
                        <PhoneCall className="w-5 h-5" />
                        Get Call Back
                      </motion.button>

                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleQuickAction('download')}
                        className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-xl border border-white/20 transition-all duration-300"
                      >
                        <Download className="w-5 h-5" />
                        Download Brochure
                      </motion.button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <motion.div
                        variants={inputVariants}
                        animate={focusedField === 'fullName' ? 'focused' : 'unfocused'}
                        className="relative"
                      >
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          onFocus={() => setFocusedField('fullName')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full bg-white/5 border-2 ${
                            errors.fullName ? 'border-red-400' : 'border-white/20'
                          } rounded-xl px-4 py-4 pt-6 text-white placeholder-transparent focus:border-amber-400 focus:outline-none transition-all duration-300`}
                          placeholder="Full Name"
                          required
                        />
                        <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          formData.fullName || focusedField === 'fullName'
                            ? 'text-xs text-slate-300 top-2'
                            : 'text-slate-400 top-4'
                        }`}>
                          Full Name *
                        </label>
                        <User className="absolute right-4 top-4 w-5 h-5 text-slate-400" />
                        {errors.fullName && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 mt-2 text-red-400 text-sm"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.fullName}
                          </motion.div>
                        )}
                      </motion.div>

                      {/* Email */}
                      <motion.div
                        variants={inputVariants}
                        animate={focusedField === 'email' ? 'focused' : 'unfocused'}
                        className="relative"
                      >
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full bg-white/5 border-2 ${
                            errors.email ? 'border-red-400' : 'border-white/20'
                          } rounded-xl px-4 py-4 pt-6 text-white placeholder-transparent focus:border-amber-400 focus:outline-none transition-all duration-300`}
                          placeholder="Email Address"
                          required
                        />
                        <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          formData.email || focusedField === 'email'
                            ? 'text-xs text-slate-300 top-2'
                            : 'text-slate-400 top-4'
                        }`}>
                          Email Address *
                        </label>
                        <Mail className="absolute right-4 top-4 w-5 h-5 text-slate-400" />
                        {errors.email && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 mt-2 text-red-400 text-sm"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.email}
                          </motion.div>
                        )}
                      </motion.div>

                      {/* Phone */}
                      <motion.div
                        variants={inputVariants}
                        animate={focusedField === 'phone' ? 'focused' : 'unfocused'}
                        className="relative"
                      >
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full bg-white/5 border-2 ${
                            errors.phone ? 'border-red-400' : 'border-white/20'
                          } rounded-xl px-4 py-4 pt-6 text-white placeholder-transparent focus:border-amber-400 focus:outline-none transition-all duration-300`}
                          placeholder="Phone Number"
                          required
                        />
                        <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          formData.phone || focusedField === 'phone'
                            ? 'text-xs text-slate-300 top-2'
                            : 'text-slate-400 top-4'
                        }`}>
                          Phone Number *
                        </label>
                        <Phone className="absolute right-4 top-4 w-5 h-5 text-slate-400" />
                        {errors.phone && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 mt-2 text-red-400 text-sm"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.phone}
                          </motion.div>
                        )}
                      </motion.div>

                      {/* Property Interest */}
                      <div className="relative">
                        <select
                          value={formData.propertyInterest}
                          onChange={(e) => handleInputChange('propertyInterest', e.target.value)}
                          className="w-full bg-white/5 border-2 border-white/20 rounded-xl px-4 py-4 text-white focus:border-amber-400 focus:outline-none transition-all duration-300 appearance-none"
                        >
                          <option value="" disabled className="bg-slate-800">Select Property Type</option>
                          {propertyOptions.map(option => (
                            <option key={option.value} value={option.value} className="bg-slate-800">
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <Home className="absolute right-4 top-4 w-5 h-5 text-slate-400 pointer-events-none" />
                      </div>

                      {/* Budget Range */}
                      <div className="relative">
                        <select
                          value={formData.budgetRange}
                          onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                          className="w-full bg-white/5 border-2 border-white/20 rounded-xl px-4 py-4 text-white focus:border-amber-400 focus:outline-none transition-all duration-300 appearance-none"
                        >
                          <option value="" disabled className="bg-slate-800">Select Budget Range</option>
                          {budgetRanges.map(range => (
                            <option key={range.value} value={range.value} className="bg-slate-800">
                              {range.label}
                            </option>
                          ))}
                        </select>
                        <DollarSign className="absolute right-4 top-4 w-5 h-5 text-slate-400 pointer-events-none" />
                      </div>

                      {/* Contact Method */}
                      <div>
                        <label className="text-slate-300 text-sm mb-3 block">Preferred Contact Method</label>
                        <div className="flex gap-4">
                          {[
                            { value: 'call', label: 'Call' },
                            { value: 'email', label: 'Email' },
                            { value: 'visit', label: 'Site Visit' }
                          ].map(method => (
                            <motion.label
                              key={method.value}
                              whileHover={{ scale: 1.02 }}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <input
                                type="radio"
                                value={method.value}
                                checked={formData.contactMethod === method.value}
                                onChange={(e) => handleInputChange('contactMethod', e.target.value)}
                                className="w-4 h-4 text-amber-500 border-white/20 focus:ring-amber-500 focus:ring-offset-0 bg-white/5"
                              />
                              <span className="text-white">{method.label}</span>
                            </motion.label>
                          ))}
                        </div>
                      </div>

                      {/* Preferred Time */}
                      <div className="relative">
                        <select
                          value={formData.preferredTime}
                          onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                          className="w-full bg-white/5 border-2 border-white/20 rounded-xl px-4 py-4 text-white focus:border-amber-400 focus:outline-none transition-all duration-300 appearance-none"
                        >
                          <option value="" disabled className="bg-slate-800">Preferred Time</option>
                          {timeSlots.map(slot => (
                            <option key={slot.value} value={slot.value} className="bg-slate-800">
                              {slot.label}
                            </option>
                          ))}
                        </select>
                        <Clock className="absolute right-4 top-4 w-5 h-5 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Message */}
                    <motion.div
                      variants={inputVariants}
                      animate={focusedField === 'message' ? 'focused' : 'unfocused'}
                      className="relative"
                    >
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        rows={4}
                        className="w-full bg-white/5 border-2 border-white/20 rounded-xl px-4 py-4 pt-6 text-white placeholder-transparent focus:border-amber-400 focus:outline-none transition-all duration-300 resize-none"
                        placeholder="Your Requirements"
                      />
                      <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        formData.message || focusedField === 'message'
                          ? 'text-xs text-slate-300 top-2'
                          : 'text-slate-400 top-4'
                      }`}>
                        Your Requirements & Message
                      </label>
                      <MessageSquare className="absolute right-4 top-4 w-5 h-5 text-slate-400" />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Office Contact */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-display font-bold text-white mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Office Address</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      123 Brigade Road,<br />
                      MG Road, Bangalore,<br />
                      Karnataka 560001
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Phone Numbers</h4>
                    <p className="text-slate-300 text-sm">
                      Sales: +91 98765 43210<br />
                      Support: +91 98765 43211
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email Addresses</h4>
                    <p className="text-slate-300 text-sm">
                      sales@ladeconstructions.com<br />
                      info@ladeconstructions.com
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Office Hours</h4>
                    <p className="text-slate-300 text-sm">
                      Mon - Sat: 9:00 AM - 7:00 PM<br />
                      Sunday: 10:00 AM - 5:00 PM
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 backdrop-blur-xl border border-amber-400/30 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Quick Actions
              </h3>
              <p className="text-slate-300 text-sm mb-6">
                Need immediate assistance? Try these quick options:
              </p>
              
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleQuickAction('visit')}
                  className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300"
                >
                  <Calendar className="w-5 h-5 text-amber-400" />
                  Schedule Site Visit
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleQuickAction('callback')}
                  className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300"
                >
                  <PhoneCall className="w-5 h-5 text-amber-400" />
                  Request Call Back
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleQuickAction('download')}
                  className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300"
                >
                  <Download className="w-5 h-5 text-amber-400" />
                  Download Brochure
                </motion.button>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-500/10 backdrop-blur-xl border border-red-400/30 rounded-3xl p-6 shadow-2xl">
              <h4 className="text-lg font-semibold text-white mb-3">
                Emergency Contact
              </h4>
              <p className="text-slate-300 text-sm mb-4">
                For urgent queries outside office hours:
              </p>
              <motion.a
                href="tel:+919876543212"
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 bg-red-500/20 hover:bg-red-500/30 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300"
              >
                <Phone className="w-5 h-5 text-red-400" />
                +91 98765 43212
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};