'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Play, Code, Palette, Database } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  category: 'web' | '3d' | 'mobile';
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'WebCraft Studios',
    description: 'A revolutionary 3D website builder platform with real-time collaboration and advanced WebGL rendering. Features drag-and-drop interface, component library, and instant preview.',
    image: '/api/placeholder/600/400',
    tech: ['React', 'Three.js', 'WebGL', 'Node.js', 'MongoDB'],
    category: '3d',
    liveUrl: 'https://webcraft-studios-demo.com',
    githubUrl: 'https://github.com/shubh124548k/webcraft-studios',
    featured: true
  },
  {
    id: 2,
    title: '3D Physics Visualizer',
    description: 'Interactive physics simulation with real-time 3D visualization. Explore gravity, collision detection, and particle systems in an immersive web environment.',
    image: '/api/placeholder/600/400',
    tech: ['Three.js', 'React', 'GLM 4.6', 'TypeScript'],
    category: '3d',
    liveUrl: 'https://physics-visualizer-demo.com',
    githubUrl: 'https://github.com/shubh124548k/physics-visualizer',
    featured: true
  },
  {
    id: 3,
    title: 'Interactive Dashboard UI',
    description: 'Modern analytics dashboard with real-time data visualization, 3D charts, and responsive design. Features custom animations and gesture controls.',
    image: '/api/placeholder/600/400',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    category: 'web',
    liveUrl: 'https://dashboard-demo.com',
    githubUrl: 'https://github.com/shubh124548k/dashboard-ui',
    featured: true
  },
  {
    id: 4,
    title: 'Portfolio Engine',
    description: 'Dynamic portfolio generator with 3D effects, customizable themes, and CMS integration. Perfect for creative professionals and agencies.',
    image: '/api/placeholder/600/400',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Three.js'],
    category: 'web',
    liveUrl: 'https://portfolio-engine-demo.com',
    githubUrl: 'https://github.com/shubh124548k/portfolio-engine',
    featured: false
  },
  {
    id: 5,
    title: 'AR Shopping Experience',
    description: 'Augmented reality shopping platform with 3D product visualization and virtual try-on features using WebXR and device cameras.',
    image: '/api/placeholder/600/400',
    tech: ['WebXR', 'Three.js', 'React', 'Node.js'],
    category: '3d',
    liveUrl: 'https://ar-shopping-demo.com',
    githubUrl: 'https://github.com/shubh124548k/ar-shopping',
    featured: false
  },
  {
    id: 6,
    title: 'Mobile 3D Gallery',
    description: 'Progressive web app for showcasing 3D artwork and sculptures with touch gestures, VR support, and social sharing features.',
    image: '/api/placeholder/600/400',
    tech: ['React Native', 'Three.js', 'PWA', 'Firebase'],
    category: 'mobile',
    liveUrl: 'https://mobile-gallery-demo.com',
    githubUrl: 'https://github.com/shubh124548k/mobile-gallery',
    featured: false
  }
];

const categoryIcons = {
  web: <Code className="w-5 h-5" />,
  '3d': <Palette className="w-5 h-5" />,
  mobile: <Database className="w-5 h-5" />
};

const categoryColors = {
  web: 'bg-primary/20 text-primary border-primary/30',
  '3d': 'bg-secondary/20 text-secondary border-secondary/30',
  mobile: 'bg-accent/20 text-accent border-accent/30'
};

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState<'all' | 'web' | '3d' | 'mobile'>('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const featuredProjects = projects.filter(project => project.featured);
  const regularProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" ref={ref} className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4">
            <span className="neon-glow-purple">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground font-poppins max-w-2xl mx-auto">
            Explore my latest work featuring cutting-edge 3D web experiences and innovative solutions
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full mt-4"></div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { value: 'all', label: 'All Projects' },
            { value: 'web', label: 'Web Apps' },
            { value: '3d', label: '3D Experiences' },
            { value: 'mobile', label: 'Mobile' }
          ].map((category) => (
            <motion.button
              key={category.value}
              onClick={() => setFilter(category.value as any)}
              className={`px-6 py-2 rounded-full font-rajdhani font-semibold transition-all duration-300 ${
                filter === category.value
                  ? 'bg-secondary text-secondary-foreground' 
                  : 'glass text-foreground hover:bg-secondary/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Projects */}
        {filter === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-rajdhani font-bold text-primary mb-8 text-center">
              Featured Projects
            </h3>
            <div className="grid lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -10 }}
                  onHoverStart={() => setHoveredProject(project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                >
                  <div className="glass rounded-2xl overflow-hidden h-full">
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-xl opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
                      </div>
                      
                      {/* Overlay with actions */}
                      <motion.div
                        className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                      >
                        <div className="flex space-x-4">
                          {project.liveUrl && (
                            <motion.a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/80 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <ExternalLink size={20} />
                            </motion.a>
                          )}
                          {project.githubUrl && (
                            <motion.a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Github size={20} />
                            </motion.a>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-rajdhani border ${categoryColors[project.category]}`}>
                          {categoryIcons[project.category]}
                          <span className="ml-1">{project.category.toUpperCase()}</span>
                        </span>
                        <div className="flex space-x-2">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80 transition-colors"
                            >
                              <Play size={16} />
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-secondary hover:text-secondary/80 transition-colors"
                            >
                              <Github size={16} />
                            </a>
                          )}
                        </div>
                      </div>

                      <h3 className="text-xl font-rajdhani font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-4 font-poppins line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-background rounded text-xs font-rajdhani text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="px-2 py-1 bg-background rounded text-xs font-rajdhani text-muted-foreground">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              <div className="glass rounded-xl p-6 h-full hover:bg-primary/5 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-rajdhani border ${categoryColors[project.category]}`}>
                    {categoryIcons[project.category]}
                    <span className="ml-1">{project.category.toUpperCase()}</span>
                  </span>
                  <div className="flex space-x-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        <Play size={16} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:text-secondary/80 transition-colors"
                      >
                        <Github size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-rajdhani font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4 font-poppins line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 2).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-background rounded text-xs font-rajdhani text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 2 && (
                    <span className="px-2 py-1 bg-background rounded text-xs font-rajdhani text-muted-foreground">
                      +{project.tech.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        {filter !== 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-12"
          >
            <motion.button
              onClick={() => setFilter('all')}
              className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-rajdhani font-bold hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}