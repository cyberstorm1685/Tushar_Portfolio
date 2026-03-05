import React, { Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Database, 
  Cpu, 
  BrainCircuit, 
  Smartphone, 
  ChevronRight,
  Download,
  Menu,
  X,
  Layers,
  Cloud,
  Globe
} from 'lucide-react';
import { AnimatedSphere, TechGrid } from './components/ThreeElements';
import { cn } from './lib/utils';

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold tracking-tighter mb-2"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-blue-400 font-mono text-sm uppercase tracking-widest"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const SkillCard = ({ icon: Icon, title, skills }: { icon: any, title: string, skills: string[] }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-blue-500/50 transition-colors"
  >
    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-blue-400" />
    </div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span key={skill} className="px-3 py-1 rounded-full bg-white/5 text-xs font-mono text-gray-400 border border-white/5">
          {skill}
        </span>
      ))}
    </div>
  </motion.div>
);

const ProjectCard = ({ title, description, tags, link, image }: { title: string, description: string, tags: string[], link: string, image: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10"
  >
    <div className="aspect-video overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="p-8">
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map(tag => (
          <span key={tag} className="text-[10px] uppercase tracking-widest font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 mb-6 line-clamp-2">{description}</p>
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-white font-bold hover:text-blue-400 transition-colors"
      >
        View Project <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  </motion.div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled ? "bg-black/80 backdrop-blur-md border-white/10 py-4" : "bg-transparent border-transparent py-6"
      )}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold tracking-tighter"
          >
            TS<span className="text-blue-500">.</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <motion.a 
              href="mailto:roytushar98@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-50 text-sm font-bold transition-colors"
            >
              Hire Me
            </motion.a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-bold"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <OrbitControls enableZoom={false} enablePan={false} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Suspense fallback={null}>
              <AnimatedSphere />
              <TechGrid />
            </Suspense>
          </Canvas>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-blue-400 font-mono mb-4 tracking-widest uppercase text-sm"
            >
              Software Developer | Mobile & Full-Stack
            </motion.p>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-none">
              Tushar Sethi<span className="text-blue-500">.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl leading-relaxed">
              Crafting scalable mobile and web applications. Expert in <span className="text-white font-medium">Flutter</span>, <span className="text-white font-medium">MERN</span>, and <span className="text-white font-medium">AI/ML</span> integration.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a 
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 font-bold flex items-center gap-2"
              >
                View Projects <ChevronRight className="w-4 h-4" />
              </motion.a>
              <div className="flex items-center gap-4 px-4">
                <a href="https://github.com/cyberstorm1685" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/in/tushar-sethi1685" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
        >
          <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-gray-500 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle subtitle="The Story">About Me</SectionTitle>
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>
                  I'm a Software Developer with extensive experience in building scalable mobile and web applications. 
                  My expertise spans across <span className="text-white">Android, Flutter, React</span>, and full-stack development with <span className="text-white">MERN</span>.
                </p>
                <p>
                  I specialize in integrating AI/ML models, cloud deployment (Azure, Firebase), and delivering user-centric solutions 
                  that solve real-world problems.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-white font-bold mb-1">Location</h4>
                    <p className="text-sm">Jaipur, India</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-white font-bold mb-1">Education</h4>
                    <p className="text-sm">BTech in CS, 2024</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
              <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/10">
                <img 
                  src="/tushar.jpeg"
                  alt="Tushar Sethi" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="Expertise">Technical Arsenal</SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkillCard 
              icon={Smartphone} 
              title="Mobile Development" 
              skills={["Flutter (Dart)", "Android (Java/Kotlin)", "React Native", "GetX", "Retrofit"]} 
            />
            <SkillCard 
              icon={Code2} 
              title="Full Stack" 
              skills={["React.js", "Node.js", "Express.js", "MongoDB", ".NET", "Angular"]} 
            />
            <SkillCard 
              icon={BrainCircuit} 
              title="Data & AI" 
              skills={["Python", "TensorFlow", "Scikit-learn", "Pandas", "NumPy"]} 
            />
            <SkillCard 
              icon={Cloud} 
              title="Cloud & Backend" 
              skills={["Azure (App Services, PIM)", "Firebase (Auth, Cloud Messaging)", "REST APIs"]} 
            />
            <SkillCard 
              icon={Database} 
              title="Databases" 
              skills={["MongoDB", "SQL", "Realtime Database"]} 
            />
            <SkillCard 
              icon={Layers} 
              title="Tools & Practices" 
              skills={["Git", "Agile/Scrum", "Android Studio", "VS Code", "Postman"]} 
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="Recent Work">Key Projects</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard 
              title="AstroGuruKripa"
              description="Built a cross-platform astrology app with live chat/call features and ML-driven personalized predictions. Integrated Firebase and secure payment gateways."
              tags={["Flutter", "Firebase", "ML Integration"]}
              link="https://play.google.com/store/apps/details?id=com.astrogurukripa.customer"
              image="https://play-lh.googleusercontent.com/lqwU_dRCcgyTz2jcw3V5cS7Ezc-PO0FnCfoQl3SeYq72KC2WqLy_CENsX--Uf9wqmmU=w480-h960-rw"
            />
            <ProjectCard 
              title="FoodZippy"
              description="Developed a full-stack food delivery application with real-time restaurant listings, order tracking, and secure payment integration."
              tags={["Flutter", "Firebase", "Node.js"]}
              link="https://play.google.com/store/apps/details?id=com.foodzippy.app"
              image="https://play-lh.googleusercontent.com/fYExhbftgotjME6ZlCV-xl03QQhrmAfr_lFdvFirpVLlXoYE_X3-mWIyU4TEc3rSLv9aCMmvP6p9qpRM5k3t=w480-h960-rw"
            />
          </div>
          <div className="mt-12 text-center">
            <a 
              href="https://github.com/cyberstorm1685" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              View more on GitHub <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="Professional Path">Experience</SectionTitle>
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l border-blue-500/30"
            >
              <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-blue-500" />
              <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-2xl font-bold">Associate Flutter Developer</h3>
                <span className="text-blue-400 font-mono text-sm">March 2025 - Sep 2025</span>
              </div>
              <p className="text-lg text-white/80 mb-4">Aselea Network OPC Pvt. Ltd</p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 mt-1 text-blue-500 flex-shrink-0" />
                  Building cross-platform mobile applications using Flutter and Dart with clean architecture.
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 mt-1 text-blue-500 flex-shrink-0" />
                  Integrating Firebase authentication, cloud storage, and REST APIs with GetX state management.
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l border-blue-500/30"
            >
              <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-blue-500" />
              <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-2xl font-bold">Application Developer</h3>
                <span className="text-blue-400 font-mono text-sm">Feb 2024 - Feb 2025</span>
              </div>
              <p className="text-lg text-white/80 mb-4">Response Infoway</p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 mt-1 text-blue-500 flex-shrink-0" />
                  Developed and maintained web and Android applications for diverse client requirements.
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 mt-1 text-blue-500 flex-shrink-0" />
                  Optimized application performance and collaborated with teams to deliver quality solutions.
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l border-blue-500/30"
            >
              <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-blue-500" />
              <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-2xl font-bold">Cloud Infrastructure Intern</h3>
                <span className="text-blue-400 font-mono text-sm">May 2023 - July 2023</span>
              </div>
              <p className="text-lg text-white/80 mb-4">Celebal Technologies</p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 mt-1 text-blue-500 flex-shrink-0" />
                  Implemented Azure Privileged Identity Management (PIM) for secure access control.
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 mt-1 text-blue-500 flex-shrink-0" />
                  Managed elevated access rights with just-in-time access and least-privileged principles.
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-3xl bg-blue-600 p-12 md:p-24 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">
                Let's build something amazing together.
              </h2>
              <p className="text-xl text-blue-100 mb-12">
                Always eager to explore new challenges, learn cutting-edge 
                technologies, and collaborate on impactful projects.
              </p>
              <div className="flex flex-wrap gap-6">
                <a 
                  href="mailto:roytushar98@gmail.com" 
                  className="px-8 py-4 rounded-full bg-white text-blue-600 font-bold flex items-center gap-2 hover:bg-blue-50 transition-colors"
                >
                  <Mail className="w-5 h-5" /> Email Me
                </a>
                <a 
                  href="https://linkedin.com/in/tushar-sethi1685" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full bg-blue-700 text-white font-bold flex items-center gap-2 hover:bg-blue-800 transition-colors"
                >
                  <Linkedin className="w-5 h-5" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-sm">
            © 2025 Tushar Sethi. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/cyberstorm1685" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
            <a href="https://linkedin.com/in/tushar-sethi1685" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="mailto:roytushar98@gmail.com" className="text-gray-500 hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

