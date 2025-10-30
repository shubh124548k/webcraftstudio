'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { Code, Palette, Database, Globe, Smartphone, Cpu } from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
  category: string;
  description: string;
}

function SkillSphere({ skills }: { skills: Skill[] }) {
  const radius = 2.5;
  
  return (
    <>
      {skills.map((skill, index) => {
        const phi = Math.acos(-1 + (2 * index) / skills.length);
        const theta = Math.sqrt(skills.length * Math.PI) * phi;
        
        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);
        
        // ✅ Fixed line below
        return (
          <group key={skill.name} position={[x, y, z]}>
            <Sphere args={[0.3, 16, 16]}>
              <meshStandardMaterial 
                color={skill.category === 'frontend' ? '#00f0ff' : 
                       skill.category === 'backend' ? '#a020f0' : 
                       skill.category === 'tools' ? '#ff6b6b' : '#4ecdc4'} 
                emissive={skill.category === 'frontend' ? '#00f0ff' : 
                         skill.category === 'backend' ? '#a020f0' : 
                         skill.category === 'tools' ? '#ff6b6b' : '#4ecdc4'}
                emissiveIntensity={0.2}
              />
            </Sphere>
          </group>
        );
      })}
    </>
  );
}


export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const skills: Skill[] = [
    {
      name: 'React.js',
      icon: <Code className="w-6 h-6" />,
      level: 90,
      category: 'frontend',
      description: 'Advanced React development with hooks, context, and performance optimization'
    },
    {
      name: 'Three.js',
      icon: <Globe className="w-6 h-6" />,
      level: 85,
      category: 'frontend',
      description: '3D graphics, WebGL, shaders, and interactive 3D experiences'
    },
    {
      name: 'WebGL',
      icon: <Cpu className="w-6 h-6" />,
      level: 80,
      category: 'frontend',
      description: 'Low-level 3D graphics programming and custom shader development'
    },
    {
      name: 'GLM 4.6',
      icon: <Database className="w-6 h-6" />,
      level: 75,
      category: 'tools',
      description: 'Mathematical computations for 3D transformations and graphics'
    },
    {
      name: 'TypeScript',
      icon: <Code className="w-6 h-6" />,
      level: 88,
      category: 'frontend',
      description: 'Type-safe JavaScript development with advanced type patterns'
    },
    {
      name: 'Node.js',
      icon: <Database className="w-6 h-6" />,
      level: 82,
      category: 'backend',
      description: 'Server-side JavaScript development and API creation'
    },
    {
      name: 'Next.js',
      icon: <Globe className="w-6 h-6" />,
      level: 87,
      category: 'frontend',
      description: 'Full-stack React framework with SSR and SSG capabilities'
    },
    {
      name: 'Tailwind CSS',
      icon: <Palette className="w-6 h-6" />,
      level: 92,
      category: 'frontend',
      description: 'Utility-first CSS framework for rapid UI development'
    },
    {
      name: 'MongoDB',
      icon: <Database className="w-6 h-6" />,
      level: 78,
      category: 'backend',
      description: 'NoSQL database design and optimization'
    },
    {
      name: 'Responsive Design',
      icon: <Smartphone className="w-6 h-6" />,
      level: 95,
      category: 'frontend',
      description: 'Mobile-first design with cross-browser compatibility'
    },
    {
      name: 'Framer Motion',
      icon: <Palette className="w-6 h-6" />,
      level: 83,
      category: 'frontend',
      description: 'Advanced animations and gesture-based interactions'
    },
    {
      name: 'Blender',
      icon: <Palette className="w-6 h-6" />,
      level: 70,
      category: 'tools',
      description: '3D modeling, animation, and asset creation for web'
    }
  ];

  const categories = [
    { name: 'Frontend', value: 'frontend', color: '#00f0ff' },
    { name: 'Backend', value: 'backend', color: '#a020f0' },
    { name: 'Tools', value: 'tools', color: '#ff6b6b' }
  ];

  const filteredSkills = selectedSkill 
    ? skills.filter(skill => skill.category === selectedSkill.category)
    : skills;

  return (
    <section id="skills" ref={ref} className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4">
            <span className="neon-glow">Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground font-poppins max-w-2xl mx-auto">
            A comprehensive skill set combining creative design with technical expertise
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-4"></div>
        </motion.div>

        {/* 3D Skills Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-16"
        >
          <div className="relative h-96 glass rounded-2xl overflow-hidden">
            <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
              <pointLight position={[-10, -10, -10]} intensity={1} color="#a020f0" />
              <SkillSphere skills={skills} />
              <OrbitControls 
                enableZoom={false} 
                autoRotate 
                autoRotateSpeed={0.5}
                enablePan={false}
              />
            </Canvas>
            
            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <h3 className="text-2xl font-orbitron font-bold neon-glow">360° Skills</h3>
                <p className="text-sm text-muted-foreground mt-2">Interactive 3D Visualization</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.button
            onClick={() => setSelectedSkill(null)}
            className={`px-6 py-2 rounded-full font-rajdhani font-semibold transition-all duration-300 ${
              !selectedSkill 
                ? 'bg-primary text-primary-foreground' 
                : 'glass text-foreground hover:bg-primary/10'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Skills
          </motion.button>
          {categories.map((category) => (
            <motion.button
              key={category.value}
              onClick={() => setSelectedSkill(skills.find(s => s.category === category.value) || null)}
              className={`px-6 py-2 rounded-full font-rajdhani font-semibold transition-all duration-300 ${
                selectedSkill?.category === category.value
                  ? 'bg-primary text-primary-foreground' 
                  : 'glass text-foreground hover:bg-primary/10'
              }`}
              style={{
                borderColor: selectedSkill?.category === category.value ? category.color : undefined
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="glass p-6 rounded-xl hover:bg-primary/5 transition-all duration-300 group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedSkill(skill)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  skill.category === 'frontend' ? 'bg-primary/20' :
                  skill.category === 'backend' ? 'bg-secondary/20' :
                  'bg-accent/20'
                }`}>
                  {skill.icon}
                </div>
                <span className={`text-sm font-rajdhani px-2 py-1 rounded ${
                  skill.category === 'frontend' ? 'bg-primary/10 text-primary' :
                  skill.category === 'backend' ? 'bg-secondary/10 text-secondary' :
                  'bg-accent/10 text-accent'
                }`}>
                  {skill.category}
                </span>
              </div>
              
              <h3 className="text-lg font-rajdhani font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {skill.name}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 font-poppins">
                {skill.description}
              </p>
              
              {/* Skill Level */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-rajdhani">Proficiency</span>
                  <span className="font-rajdhani text-primary">{skill.level}%</span>
                </div>
                <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      skill.category === 'frontend' ? 'bg-primary' :
                      skill.category === 'backend' ? 'bg-secondary' :
                      'bg-accent'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}