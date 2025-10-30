'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Box, Sphere, Cone } from '@react-three/drei';
import { ChevronDown } from 'lucide-react';

function AnimatedGeometries() {
  return (
    <>
      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        <Box position={[-2, 0, 0]} args={[1, 1, 1]} rotation={[0.4, 0.6, 0]}>
          <meshStandardMaterial color="#00f0ff" wireframe />
        </Box>
      </Float>
      
      <Float speed={3} rotationIntensity={0.5} floatIntensity={1.5}>
        <Sphere position={[2, 1, -1]} args={[0.8, 32, 32]}>
          <meshStandardMaterial color="#a020f0" wireframe />
        </Sphere>
      </Float>
      
      <Float speed={5} rotationIntensity={1.5} floatIntensity={2.5}>
        <Cone position={[0, -1, 1]} args={[0.6, 1.2, 8]} rotation={[0.5, 0.3, 0]}>
          <meshStandardMaterial color="#00f0ff" wireframe />
        </Cone>
      </Float>
    </>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#a020f0" />
          <AnimatedGeometries />
        </Canvas>
      </div>

      {/* Hero Content */}
      <motion.div 
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        style={{ y, opacity }}
      >
        {/* Animated Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-black mb-4">
            <span className="block neon-glow">Hello, I'm</span>
            <span className="block text-primary neon-glow">Subhendu Gupta</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-rajdhani font-semibold text-muted-foreground">
            Creative 3D Developer & Designer
          </h2>
          <p className="text-lg md:text-xl font-poppins text-muted-foreground mt-4 max-w-2xl mx-auto">
            Blending art, mathematics, and modern web technologies to craft immersive digital experiences
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#contact"
            className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-rajdhani font-bold text-lg hover:bg-primary/80 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 240, 255, 0.6)" }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
          
          <motion.a
            href="#projects"
            className="px-8 py-4 border-2 border-primary text-primary rounded-full font-rajdhani font-bold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05, backgroundColor: "#00f0ff", color: "#000" }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </motion.a>
        </motion.div>

        {/* Tech Stack Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {['Three.js', 'React', 'WebGL', 'GLM 4.6', 'Next.js', 'TypeScript'].map((tech, index) => (
            <motion.span
              key={tech}
              className="px-4 py-2 glass rounded-full text-sm font-rajdhani text-primary neon-glow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-primary"
        >
          <ChevronDown size={32} />
        </motion.div>
        <p className="text-sm text-muted-foreground mt-2 font-rajdhani">Scroll Down</p>
      </motion.div>
    </section>
  );
}