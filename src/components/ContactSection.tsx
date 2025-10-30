'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, Twitter, Youtube, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: 'success' | 'error' | null;
  message: string;
}

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'India',
      href: '#'
    }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/shubh124548k', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/subhendu-gupta-a341b2276?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/im_subhendu_gupta/', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com/@RAMPLAY-LIVE', label: 'YouTube' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name || formData.name.trim().length < 2) {
      setFormStatus({ type: 'error', message: 'Name must be at least 2 characters long' });
      return false;
    }
    
    if (!formData.email || !formData.email.includes('@')) {
      setFormStatus({ type: 'error', message: 'Please enter a valid email address' });
      return false;
    }
    
    if (!formData.subject || formData.subject.trim().length < 3) {
      setFormStatus({ type: 'error', message: 'Subject must be at least 3 characters long' });
      return false;
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
      setFormStatus({ type: 'error', message: 'Message must be at least 10 characters long' });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });

    try {
      // Web3Forms submission
      const web3FormData = new FormData();
      web3FormData.append('access_key', '2aa526c7-6e45-48a0-b00d-4c8091615911');
      web3FormData.append('name', formData.name);
      web3FormData.append('email', formData.email);
      web3FormData.append('subject', formData.subject);
      web3FormData.append('message', formData.message);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: web3FormData
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus({
          type: 'success',
          message: `Thank you ${formData.name}, your message has been sent successfully!`
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormStatus({
          type: 'error',
          message: data.message || 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Network error. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4">
            <span className="neon-glow-purple">Let's Connect</span>
          </h2>
          <p className="text-lg text-muted-foreground font-poppins max-w-2xl mx-auto">
            Have a project in mind? Let's create something amazing together
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full mt-4"></div>
        </motion.div>

        {/* Contact Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ rotateY: 5, scale: 1.02 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="glass p-8 rounded-2xl relative overflow-hidden">
              {/* 3D Background Animation */}
              <div className="absolute inset-0 opacity-10">
                <motion.div
                  className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1],
                    x: [0, 10, 0]
                  }}
                  transition={{ 
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-secondary to-primary rounded-full"
                  animate={{ 
                    rotate: -360,
                    scale: [1, 0.8, 1],
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
              </div>

              {/* 3D Animated Title */}
              <motion.h3 
                className="text-3xl font-orbitron font-bold mb-6 text-center relative z-10"
                initial={{ opacity: 0, y: -20, rotateX: -90 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="neon-glow-purple inline-block">Send Me a Message</span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </motion.h3>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Name Field with 3D Animation */}
                <motion.div
                  initial={{ opacity: 0, x: -30, rotateZ: -5 }}
                  animate={isInView ? { opacity: 1, x: 0, rotateZ: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileFocus={{ scale: 1.02, rotateZ: 1 }}
                >
                  <label htmlFor="name" className="block text-sm font-rajdhani text-foreground mb-2">
                    <motion.span 
                      className="inline-block"
                      whileHover={{ scale: 1.1, color: "#00f0ff" }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      Your Name
                    </motion.span>
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background/80 backdrop-blur border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 font-poppins"
                    placeholder="Enter your full name"
                    whileFocus={{ 
                      scale: 1.02, 
                      boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)",
                      borderColor: "#00f0ff"
                    }}
                  />
                </motion.div>

                {/* Email Field with 3D Animation */}
                <motion.div
                  initial={{ opacity: 0, x: 30, rotateZ: 5 }}
                  animate={isInView ? { opacity: 1, x: 0, rotateZ: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileFocus={{ scale: 1.02, rotateZ: -1 }}
                >
                  <label htmlFor="email" className="block text-sm font-rajdhani text-foreground mb-2">
                    <motion.span 
                      className="inline-block"
                      whileHover={{ scale: 1.1, color: "#00f0ff" }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      Your Email
                    </motion.span>
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background/80 backdrop-blur border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 font-poppins"
                    placeholder="your.email@example.com"
                    whileFocus={{ 
                      scale: 1.02, 
                      boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)",
                      borderColor: "#00f0ff"
                    }}
                  />
                </motion.div>

                {/* Subject Field with 3D Animation */}
                <motion.div
                  initial={{ opacity: 0, x: -30, rotateZ: -3 }}
                  animate={isInView ? { opacity: 1, x: 0, rotateZ: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileFocus={{ scale: 1.02, rotateZ: 2 }}
                >
                  <label htmlFor="subject" className="block text-sm font-rajdhani text-foreground mb-2">
                    <motion.span 
                      className="inline-block"
                      whileHover={{ scale: 1.1, color: "#00f0ff" }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      Subject
                    </motion.span>
                  </label>
                  <motion.input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background/80 backdrop-blur border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 font-poppins"
                    placeholder="What's this about?"
                    whileFocus={{ 
                      scale: 1.02, 
                      boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)",
                      borderColor: "#00f0ff"
                    }}
                  />
                </motion.div>

                {/* Message Field with 3D Animation */}
                <motion.div
                  initial={{ opacity: 0, x: 30, rotateZ: 3 }}
                  animate={isInView ? { opacity: 1, x: 0, rotateZ: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileFocus={{ scale: 1.02, rotateZ: -2 }}
                >
                  <label htmlFor="message" className="block text-sm font-rajdhani text-foreground mb-2">
                    <motion.span 
                      className="inline-block"
                      whileHover={{ scale: 1.1, color: "#00f0ff" }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      Message
                    </motion.span>
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-background/80 backdrop-blur border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 font-poppins resize-none"
                    placeholder="Tell me about your project or ideas..."
                    whileFocus={{ 
                      scale: 1.02, 
                      boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)",
                      borderColor: "#00f0ff"
                    }}
                  />
                </motion.div>

                {/* Form Status with 3D Animation */}
                {formStatus.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    className={`p-4 rounded-lg flex items-center space-x-3 backdrop-blur ${
                      formStatus.type === 'success' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {formStatus.type === 'success' ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      </motion.div>
                    ) : (
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 0.5, repeat: 3 }}
                      >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      </motion.div>
                    )}
                    <span className="text-sm font-poppins">{formStatus.message}</span>
                  </motion.div>
                )}

                {/* 3D Animated Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-orbitron font-bold relative overflow-hidden group"
                  whileHover={{ 
                    scale: 1.05, 
                    rotateX: 10,
                    boxShadow: "0 10px 30px rgba(0, 240, 255, 0.5)"
                  }}
                  whileTap={{ scale: 0.98, rotateX: -10 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Button Background Animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-secondary to-primary"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Button Content */}
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <motion.div
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <Send className="w-5 h-5" />
                        </motion.div>
                        <span>Send Message</span>
                      </>
                    )}
                  </span>

                  {/* 3D Button Effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <motion.div
              className="glass p-8 rounded-2xl"
              whileHover={{ scale: 1.02, rotateY: 5 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <h3 className="text-2xl font-rajdhani font-bold text-primary mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-primary/10 transition-all duration-300 group"
                    whileHover={{ x: 5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div 
                      className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <info.icon className="w-5 h-5 text-primary" />
                    </motion.div>
                    <div>
                      <p className="text-sm text-muted-foreground font-rajdhani">{info.label}</p>
                      <p className="text-foreground font-poppins group-hover:text-primary transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="glass p-8 rounded-2xl"
              whileHover={{ scale: 1.02, rotateY: -5 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <h3 className="text-2xl font-rajdhani font-bold text-primary mb-6">
                Follow Me
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 glass rounded-lg hover:bg-primary/10 transition-all duration-300 group"
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      rotateZ: index % 2 === 0 ? 5 : -5
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      <social.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    </motion.div>
                    <span className="font-rajdhani text-foreground group-hover:text-primary transition-colors">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* 3D Globe Placeholder */}
            <motion.div
              className="glass p-8 rounded-2xl flex items-center justify-center h-64"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05, rotateY: 180 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                className="w-32 h-32 relative"
                animate={{ rotateY: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 blur-xl"></div>
                <div className="absolute inset-2 bg-gradient-to-tr from-primary/40 to-secondary/40 rounded-full"></div>
                <div className="absolute inset-4 bg-gradient-to-bl from-primary/60 to-secondary/60 rounded-full flex items-center justify-center">
                  <motion.div 
                    className="text-2xl font-orbitron font-bold text-white"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotateZ: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      scale: { duration: 2, repeat: Infinity },
                      rotateZ: { duration: 4, repeat: Infinity }
                    }}
                  >
                    3D
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}