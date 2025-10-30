'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Award, BookOpen, Briefcase, GraduationCap } from 'lucide-react';

interface TimelineItem {
  id: number;
  type: 'experience' | 'education';
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string[];
  icon: React.ReactNode;
}

const timelineItems: TimelineItem[] = [
  {
    id: 1,
    type: 'experience',
    title: 'Senior 3D Web Developer',
    organization: 'Tech Innovation Labs',
    location: 'Bangalore, India',
    period: '2022 - Present',
    description: [
      'Lead development of immersive 3D web experiences using Three.js and WebGL',
      'Architected scalable React applications with advanced state management',
      'Mentored junior developers and established best practices for 3D web development',
      'Collaborated with design teams to implement cutting-edge UI/UX concepts'
    ],
    icon: <Briefcase className="w-6 h-6" />
  },
  {
    id: 2,
    type: 'experience',
    title: 'Full Stack Developer',
    organization: 'Digital Creative Agency',
    location: 'Mumbai, India',
    period: '2020 - 2022',
    description: [
      'Developed responsive web applications with modern JavaScript frameworks',
      'Implemented RESTful APIs and database architectures',
      'Created interactive data visualizations and dashboard components',
      'Optimized application performance and loading speeds'
    ],
    icon: <Briefcase className="w-6 h-6" />
  },
  {
    id: 3,
    type: 'education',
    title: 'Master of Computer Science',
    organization: 'Indian Institute of Technology',
    location: 'Delhi, India',
    period: '2018 - 2020',
    description: [
      'Specialized in Computer Graphics and Visualization',
      'Research on WebGL performance optimization techniques',
      'GPA: 3.8/4.0',
      'Thesis: "Advanced 3D Rendering Techniques for Web Applications"'
    ],
    icon: <GraduationCap className="w-6 h-6" />
  },
  {
    id: 4,
    type: 'education',
    title: 'Bachelor of Technology',
    organization: 'National Institute of Technology',
    location: 'Kolkata, India',
    period: '2014 - 2018',
    description: [
      'Major in Computer Science and Engineering',
      'Minor in Mathematics and Computational Graphics',
      'Dean\'s List for academic excellence',
      'Led multiple hackathon winning teams'
    ],
    icon: <GraduationCap className="w-6 h-6" />
  },
  {
    id: 5,
    type: 'experience',
    title: 'Frontend Developer Intern',
    organization: 'Startup Hub',
    location: 'Pune, India',
    period: '2018 - 2019',
    description: [
      'Developed responsive user interfaces with React and Vue.js',
      'Implemented real-time features using WebSockets',
      'Collaborated in agile development environment',
      'Contributed to open-source projects'
    ],
    icon: <Briefcase className="w-6 h-6" />
  },
  {
    id: 6,
    type: 'education',
    title: 'Professional Certifications',
    organization: 'Various Platforms',
    location: 'Online',
    period: '2019 - Present',
    description: [
      'Advanced WebGL and Three.js Development',
      'React Performance Optimization',
      'Cloud Architecture and Deployment',
      'UI/UX Design Principles'
    ],
    icon: <Award className="w-6 h-6" />
  }
];

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experienceItems = timelineItems.filter(item => item.type === 'experience');
  const educationItems = timelineItems.filter(item => item.type === 'education');

  return (
    <section id="experience" ref={ref} className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4">
            <span className="neon-glow">Experience & Education</span>
          </h2>
          <p className="text-lg text-muted-foreground font-poppins max-w-2xl mx-auto">
            My professional journey and academic background in technology and design
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-4"></div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ transformOrigin: 'top' }}
          />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <motion.div
                key={item.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 * index }}
              >
                {/* Timeline Dot */}
                <motion.div
                  className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-background z-10 ${
                    item.type === 'experience' ? 'bg-primary' : 'bg-secondary'
                  }`}
                  whileHover={{ scale: 1.5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                />

                {/* Content Card */}
                <motion.div
                  className={`w-full md:w-5/12 glass p-6 rounded-xl ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                  }`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        item.type === 'experience' ? 'bg-primary/20' : 'bg-secondary/20'
                      }`}>
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-rajdhani font-bold text-foreground">
                          {item.title}
                        </h3>
                        <p className={`text-sm font-semibold ${
                          item.type === 'experience' ? 'text-primary' : 'text-secondary'
                        }`}>
                          {item.organization}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span className="font-rajdhani">{item.period}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span className="font-rajdhani">{item.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2">
                    {item.description.map((point, pointIndex) => (
                      <motion.li
                        key={pointIndex}
                        className="text-sm text-muted-foreground font-poppins flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.1 * index + 0.05 * pointIndex }}
                      >
                        <span className={`w-2 h-2 rounded-full mt-1.5 mr-3 flex-shrink-0 ${
                          item.type === 'experience' ? 'bg-primary' : 'bg-secondary'
                        }`} />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-4 gap-6 mt-20"
        >
          {[
            { number: '5+', label: 'Years Experience', color: 'primary' },
            { number: '50+', label: 'Projects Completed', color: 'secondary' },
            { number: '30+', label: 'Happy Clients', color: 'accent' },
            { number: '15+', label: 'Technologies', color: 'primary' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass p-6 rounded-xl text-center group hover:bg-primary/5 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className={`text-3xl md:text-4xl font-orbitron font-bold mb-2 ${
                  stat.color === 'primary' ? 'text-primary' :
                  stat.color === 'secondary' ? 'text-secondary' :
                  'text-accent'
                }`}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
              >
                {stat.number}
              </motion.div>
              <p className="text-sm font-rajdhani text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}