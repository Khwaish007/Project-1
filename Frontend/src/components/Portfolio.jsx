import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { 
  BriefcaseIcon, 
  CheckBadgeIcon, 
  ClockIcon, 
  CodeBracketIcon,
  CpuChipIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  RocketLaunchIcon,
  SparklesIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const PortfolioSkeleton = () => (
  <div className="bg-gray-700/50 p-6 rounded-2xl animate-pulse">
    <div className="h-6 bg-gray-600 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-600 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-600 rounded w-5/6 mb-6"></div>
    <div className="flex justify-between items-center border-t border-gray-600 pt-4">
      <div className="h-8 bg-gray-600 rounded w-1/3"></div>
      <div className="h-8 bg-gray-600 rounded w-1/4"></div>
    </div>
  </div>
);

const FloatingIcon = ({ icon: Icon, className, delay = 0 }) => (
  <div 
    className={`absolute ${className} animate-bounce opacity-30`}
    style={{ 
      animationDelay: `${delay}s`,
      animationDuration: '3s'
    }}
  >
    <Icon className="w-8 h-8 text-indigo-400" />
  </div>
);


const TypewriterText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, 100 + delay);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

const StatsCounter = ({ end, label, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-white mb-2">{count}+</div>
      <div className="text-gray-300 text-sm uppercase tracking-wider">{label}</div>
    </div>
  );
};

const Portfolio = () => {
  const [completedProjects, setCompletedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const projectsSectionRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      fetchCompletedProjects();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const fetchCompletedProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/projects/completed');
      setCompletedProjects(response.data);
    } catch (err) {
      setError('Failed to fetch projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const calculateDuration = (start, end) => {
    const duration = Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24));
    return duration > 0 ? `${duration} days` : '1 day';
  };

  const scrollToProjects = () => {
    projectsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    { icon: GlobeAltIcon, title: "Web Development", description: "Modern, responsive websites" },
    { icon: DevicePhoneMobileIcon, title: "Mobile Apps", description: "iOS & Android applications" },
    { icon: CpuChipIcon, title: "AI Solutions", description: "Machine learning & automation" },
    { icon: CodeBracketIcon, title: "Custom Software", description: "Tailored business solutions" }
  ];

  return (
    <div className="bg-gray-900 min-h-screen overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <ParticleBackground />
        
        {/* Floating Icons */}
        <FloatingIcon icon={RocketLaunchIcon} className="top-20 left-10" delay={0} />
        <FloatingIcon icon={SparklesIcon} className="top-32 right-20" delay={1} />
        <FloatingIcon icon={CodeBracketIcon} className="bottom-40 left-20" delay={2} />
        <FloatingIcon icon={CpuChipIcon} className="bottom-20 right-10" delay={0.5} />
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className={`relative z-10 text-center px-4 transition-all duration-2000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              <TypewriterText text="Innovate" delay={500} />
            </span>
          </h1>
          <h2 className="text-4xl md:text-6xl font-semibold text-gray-300 mb-8">
            <TypewriterText text="Create. Transform." delay={2000} />
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
            We craft digital experiences that push boundaries and redefine possibilities. 
            From concept to reality, we bring your vision to life.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              to="/submit-project"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10">Start Your Project</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <button 
              onClick={scrollToProjects}
              className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              View Our Work
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <StatsCounter end={50} label="Projects" />
            <StatsCounter end={25} label="Clients" />
            <StatsCounter end={100} label="Success Rate" />
            <StatsCounter end={3} label="Years" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">What We Do</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <service.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio/Work Section */}
      <section ref={projectsSectionRef} className="relative py-20 px-4 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Latest Work
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Showcasing successful projects delivered to our valued clients
            </p>
          </div>

          {error && (
            <div className="text-center text-red-400 font-semibold mb-8">{error}</div>
          )}

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <PortfolioSkeleton key={i} />)
            ) : completedProjects.length === 0 && !error ? (
              <div className="md:col-span-2 lg:col-span-3 text-center py-16 px-4 bg-gray-700/30 rounded-2xl border border-gray-600/30">
                <BriefcaseIcon className="mx-auto h-16 w-16 text-gray-500 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">Amazing Projects Coming Soon</h3>
                <p className="text-gray-400">We're working on incredible projects that will be showcased here once completed.</p>
              </div>
            ) : (
              completedProjects.map((project, index) => (
                <div
                  key={project._id}
                  className="group bg-gray-700/30 backdrop-blur-sm border border-gray-600/30 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                        {project.projectTitle}
                      </h3>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-6 line-clamp-3 group-hover:text-gray-200 transition-colors duration-300">
                      {project.projectDetails}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-400">
                        <CheckBadgeIcon className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                        <span>Completed {new Date(project.completedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <ClockIcon className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
                        <span>Duration: {calculateDuration(project.submittedAt, project.completedAt)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-600/30 px-6 py-4 border-t border-gray-600/30">
                    <p className="text-sm font-medium text-gray-300">
                      Client: <span className="text-white">{project.name}</span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/submit-project"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            >
              <RocketLaunchIcon className="w-5 h-5 mr-2" />
              Ready to Start Your Project?
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;