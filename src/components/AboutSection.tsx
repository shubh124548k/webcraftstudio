'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Phone, Mail, MapPin, Calendar, Award, Target } from 'lucide-react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9330564851',
      href: 'tel:+919330564851'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9007455163',
      href: 'tel:+919007455163'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'subhendugupta133@gmail.com',
      href: 'mailto:subhendugupta133@gmail.com'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'dipendugupta123@gmail.com',
      href: 'mailto:dipendugupta123@gmail.com'
    }
  ];

  const highlights = [
    {
      icon: Target,
      title: 'Mission',
      description: 'Creating immersive 3D web experiences that push the boundaries of digital art and technology'
    },
    {
      icon: Award,
      title: 'Expertise',
      description: 'Specializing in GLM 4.6-powered 3D design, WebGL, and React-based interactive systems'
    },
    {
      icon: Calendar,
      title: 'Experience',
      description: 'Years of experience in blending mathematics, art, and modern web technologies'
    }
  ];

  return (
    <section id="about" ref={ref} className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4">
            <span className="neon-glow-purple">About Me</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - 3D Avatar Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-96 glass rounded-2xl p-8 flex items-center justify-center">
              {/* 3D Avatar Animation */}
              <motion.div
                className="w-64 h-64 relative"
                animate={{ rotateY: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 blur-xl"></div>
                <div className="absolute inset-4 bg-gradient-to-tr from-primary/40 to-secondary/40 rounded-full"></div>
                <div className="absolute inset-8 bg-gradient-to-bl from-primary/60 to-secondary/60 rounded-full flex items-center justify-center">
                  <div className="text-6xl font-orbitron font-bold text-white">SG</div>
                </div>
              </motion.div>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute top-4 right-4 w-12 h-12 bg-primary/20 rounded-full"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-4 left-4 w-8 h-8 bg-secondary/20 rounded-full"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Right Side - About Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-rajdhani font-bold text-primary">
                Subhendu Gupta
              </h3>
              <p className="text-lg font-poppins text-muted-foreground leading-relaxed">
                I'm a creative 3D Developer and Designer blending art, mathematics, and modern web technologies to craft immersive digital experiences.
              </p>
              <p className="text-lg font-poppins text-muted-foreground leading-relaxed">
                I specialize in GLM 4.6–powered 3D design, WebGL, and React-based interactive systems. I'm passionate about innovation, futuristic UI, and bringing 3D worlds to the web.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="text-xl font-rajdhani font-semibold text-primary">Contact Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    className="flex items-center space-x-3 p-3 glass rounded-lg hover:bg-primary/10 transition-all duration-300 group"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <info.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-xs text-muted-foreground">{info.label}</p>
                      <p className="text-sm font-rajdhani text-foreground group-hover:text-primary transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              className="glass p-6 rounded-xl text-center group hover:bg-primary/5 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <highlight.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-rajdhani font-bold text-primary mb-2">
                {highlight.title}
              </h3>
              <p className="text-sm font-poppins text-muted-foreground">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}