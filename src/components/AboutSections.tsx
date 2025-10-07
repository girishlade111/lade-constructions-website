"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Award, 
  Users, 
  Target, 
  Heart, 
  Lightbulb, 
  Shield, 
  CheckCircle,
  Building,
  Trophy,
  Star,
  TrendingUp,
  Clock,
  MapPin
} from 'lucide-react';

interface Statistic {
  number: string;
  label: string;
  suffix?: string;
}

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TeamMember {
  name: string;
  position: string;
  experience: string;
  image?: string;
}

interface Achievement {
  icon: React.ReactNode;
  title: string;
  description: string;
  year?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleOnHover = {
  whileHover: { scale: 1.02, transition: { duration: 0.2 } }
};

const statistics: Statistic[] = [
  { number: "15", label: "Years of Excellence", suffix: "+" },
  { number: "200", label: "Premium Projects", suffix: "+" },
  { number: "98", label: "Client Satisfaction", suffix: "%" },
  { number: "50", label: "Expert Team Members", suffix: "+" }
];

const values: Value[] = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Quality",
    description: "Unwavering commitment to superior construction standards and premium materials in every project."
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Integrity",
    description: "Transparent processes, honest communication, and ethical business practices that build lasting trust."
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Innovation",
    description: "Embracing cutting-edge construction technologies and design trends for modern living solutions."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Customer-Centricity",
    description: "Placing our clients at the heart of everything we do, ensuring their vision becomes reality."
  }
];

const teamMembers: TeamMember[] = [
  {
    name: "Girish Lade",
    position: "Founder & Managing Director",
    experience: "15+ years in luxury construction and real estate development"
  },
  {
    name: "Priya Sharma",
    position: "Chief Architect",
    experience: "12+ years in residential and commercial architecture"
  },
  {
    name: "Rajesh Kumar",
    position: "Construction Manager",
    experience: "10+ years in premium construction management"
  },
  {
    name: "Meera Patel",
    position: "Customer Relations Head",
    experience: "8+ years in luxury real estate customer service"
  }
];

const achievements: Achievement[] = [
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Excellence in Construction Award",
    description: "Recognized for outstanding quality in residential construction",
    year: "2023"
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Premium Developer Certification",
    description: "Certified for luxury residential development standards",
    year: "2022"
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Quality Assurance Recognition",
    description: "Awarded for maintaining highest construction quality standards",
    year: "2023"
  },
  {
    icon: <Building className="w-6 h-6" />,
    title: "Sustainable Building Practices",
    description: "Recognition for eco-friendly construction methodologies",
    year: "2024"
  }
];

const AnimatedCounter: React.FC<{ end: number; duration?: number; suffix?: string }> = ({ 
  end, 
  duration = 2, 
  suffix = "" 
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true });
  
  return (
    <motion.span
      ref={nodeRef}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ textContent: "0" }}
        animate={inView ? { textContent: end.toString() } : { textContent: "0" }}
        transition={{ duration, ease: "easeOut" }}
        onUpdate={(latest) => {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(latest.textContent as number).toString() + suffix;
          }
        }}
      />
    </motion.span>
  );
};

export default function AboutSections() {
  return (
    <div className="relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,191,36,0.08),transparent_50%)]" />

      <div className="relative z-10">
        {/* Our Story Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-10%" }}
              variants={staggerContainer}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              <motion.div variants={fadeInUp} className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                    Our Story of
                    <span className="text-amber-400 block">Excellence</span>
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
                </div>
                
                <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                  <p>
                    Founded by <strong className="text-amber-400">Girish Lade</strong> with over 15 years of 
                    unwavering dedication to luxury construction, Lade Constructions has grown from a 
                    visionary dream into one of the most trusted names in premium real estate development.
                  </p>
                  <p>
                    Our journey began with a simple yet powerful vision: to create living spaces that 
                    don't just house families, but nurture dreams and aspirations. Today, we stand proud 
                    as architects of luxury, having transformed the landscape of premium residential construction.
                  </p>
                  <p>
                    Every project we undertake reflects our commitment to excellence, innovation, and the 
                    timeless pursuit of creating homes that stand as testaments to quality craftsmanship 
                    and sophisticated design.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  {statistics.map((stat, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      whileHover={scaleOnHover.whileHover}
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300"
                    >
                      <div className="text-3xl lg:text-4xl font-bold text-amber-400 mb-2">
                        <AnimatedCounter end={parseInt(stat.number)} suffix={stat.suffix} />
                      </div>
                      <div className="text-slate-300 text-sm font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  variants={fadeInUp}
                  whileHover={scaleOnHover.whileHover}
                  className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 backdrop-blur-md border border-amber-400/30 rounded-2xl p-8"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <TrendingUp className="w-8 h-8 text-amber-400" />
                    <h3 className="text-xl font-semibold text-white">Growing Legacy</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    From our humble beginnings to becoming a recognized leader in luxury construction, 
                    our growth story is built on trust, quality, and an unwavering commitment to 
                    exceeding expectations.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-10%" }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Mission & Vision
              </motion.h2>
              <motion.div variants={fadeInUp} className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mx-auto" />
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                variants={fadeInUp}
                whileHover={scaleOnHover.whileHover}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 lg:p-10 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                </div>
                <p className="text-slate-300 text-lg leading-relaxed">
                  To transform the landscape of luxury living by delivering exceptional residential 
                  and commercial spaces that exceed expectations. We are committed to creating 
                  sustainable, innovative, and beautifully crafted environments that enhance the 
                  quality of life for our residents and contribute positively to the communities we serve.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                whileHover={scaleOnHover.whileHover}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 lg:p-10 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Our Vision</h3>
                </div>
                <p className="text-slate-300 text-lg leading-relaxed">
                  To be recognized as the premier luxury construction company, setting new standards 
                  for excellence in design, quality, and customer satisfaction. We envision a future 
                  where every Lade Construction project stands as a landmark of architectural 
                  brilliance and a testament to superior craftsmanship.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-10%" }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Our Core Values
              </motion.h2>
              <motion.div variants={fadeInUp} className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mx-auto mb-6" />
              <motion.p variants={fadeInUp} className="text-xl text-slate-300 max-w-3xl mx-auto">
                The principles that guide every decision we make and every project we undertake
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid md:grid-cols-2 xl:grid-cols-4 gap-8"
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ ...scaleOnHover.whileHover, y: -8 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center hover:bg-white/15 hover:border-amber-400/50 transition-all duration-300 group"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-10%" }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Leadership Team
              </motion.h2>
              <motion.div variants={fadeInUp} className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mx-auto mb-6" />
              <motion.p variants={fadeInUp} className="text-xl text-slate-300 max-w-3xl mx-auto">
                Meet the visionaries and experts driving Lade Constructions towards excellence
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid md:grid-cols-2 xl:grid-cols-4 gap-8"
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={scaleOnHover.whileHover}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center hover:bg-white/15 hover:border-amber-400/50 transition-all duration-300"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-amber-400 font-semibold mb-4">{member.position}</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{member.experience}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Founder Spotlight */}
            <motion.div
              variants={fadeInUp}
              whileHover={scaleOnHover.whileHover}
              className="mt-16 bg-gradient-to-br from-amber-500/20 to-amber-600/20 backdrop-blur-md border border-amber-400/30 rounded-3xl p-8 lg:p-12"
            >
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center gap-4">
                    <Clock className="w-8 h-8 text-amber-400" />
                    <h3 className="text-2xl font-bold text-white">Founder's Message</h3>
                  </div>
                  <blockquote className="text-lg text-slate-300 leading-relaxed italic">
                    "At Lade Constructions, we don't just build structures; we craft dreams into reality. 
                    Every project is a testament to our commitment to excellence, and every satisfied 
                    customer fuels our passion to reach new heights of luxury and innovation."
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">GL</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Girish Lade</p>
                      <p className="text-amber-400 text-sm">Founder & Managing Director</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center lg:justify-end">
                  <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                    <Users className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Awards & Recognition Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-10%" }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Awards & Recognition
              </motion.h2>
              <motion.div variants={fadeInUp} className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mx-auto mb-6" />
              <motion.p variants={fadeInUp} className="text-xl text-slate-300 max-w-3xl mx-auto">
                Our commitment to excellence has been recognized by industry leaders and satisfied customers
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-8"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={scaleOnHover.whileHover}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-white/15 hover:border-amber-400/50 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">
                        {achievement.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-white">{achievement.title}</h3>
                        {achievement.year && (
                          <span className="px-3 py-1 bg-amber-400/20 border border-amber-400/30 rounded-full text-amber-400 text-sm font-semibold">
                            {achievement.year}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-300 leading-relaxed">{achievement.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Recognition Stats */}
            <motion.div
              variants={fadeInUp}
              className="mt-16 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-md border border-white/20 rounded-3xl p-8 lg:p-12"
            >
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-3">
                  <MapPin className="w-8 h-8 text-amber-400 mx-auto" />
                  <div className="text-3xl font-bold text-white">
                    <AnimatedCounter end={5} suffix="+" />
                  </div>
                  <p className="text-slate-300">Industry Certifications</p>
                </div>
                <div className="space-y-3">
                  <Trophy className="w-8 h-8 text-amber-400 mx-auto" />
                  <div className="text-3xl font-bold text-white">
                    <AnimatedCounter end={12} suffix="+" />
                  </div>
                  <p className="text-slate-300">Quality Awards</p>
                </div>
                <div className="space-y-3">
                  <Star className="w-8 h-8 text-amber-400 mx-auto" />
                  <div className="text-3xl font-bold text-white">
                    <AnimatedCounter end={4} suffix=".8" />
                  </div>
                  <p className="text-slate-300">Customer Rating</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}