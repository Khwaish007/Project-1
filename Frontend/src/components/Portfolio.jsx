import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProjectDetailModal from './ProjectDetailModal';

import { 
  BriefcaseIcon, 
  CheckBadgeIcon, 
  CodeBracketIcon,
  CpuChipIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  RocketLaunchIcon,
  SparklesIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const PortfolioSkeleton = () => (
  <div className="bg-gray-700/50 rounded-2xl animate-pulse">
    <div className="aspect-video bg-gray-600 rounded-t-2xl"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-600 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-600 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-600 rounded w-5/6 mb-6"></div>
      <div className="flex justify-between items-center border-t border-gray-600 pt-4">
        <div className="h-8 bg-gray-600 rounded w-1/3"></div>
        <div className="h-8 bg-gray-600 rounded w-1/4"></div>
      </div>
    </div>
  </div>
);

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video bg-gray-800 flex items-center justify-center rounded-t-2xl">
        <BriefcaseIcon className="w-12 h-12 text-gray-600" />
      </div>
    );
  }

  const goToPrevious = (e) => {
    e.stopPropagation();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative h-56 w-full overflow-hidden group/slider">
      <div
        className="w-full h-full rounded-t-2xl bg-cover bg-center transition-all duration-500 ease-in-out"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      ></div>
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 text-white p-1 rounded-full opacity-0 group-hover/slider:opacity-100 transition-opacity z-10"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 text-white p-1 rounded-full opacity-0 group-hover/slider:opacity-100 transition-opacity z-10"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </>
      )}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-white' : 'bg-white/50'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

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
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
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
  const [selectedProject, setSelectedProject] = useState(null);
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
      
      {/* Hero Section with Full-Screen Video Background */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="https://cdn.pixabay.com/video/2025/10/10/309075_large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <ParticleBackground />
        
        <div className={`relative z-20 transition-all duration-1000 px-4 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              <TypewriterText text="Innovate" delay={150} />
            </span>
          </h1>
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-300 mb-8">
            <TypewriterText text="Create. Transform." delay={150} />
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
            We craft digital experiences that push boundaries and redefine possibilities. 
            From concept to reality, we bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
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
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-3 bg-white rounded-full mt-1 animate-pulse"></div>
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
                  className="group bg-gray-700/30 backdrop-blur-sm border border-gray-600/30 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:scale-105 flex flex-col cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative">
                    <ImageSlider images={project.imageUrls} />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <EyeIcon className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {project.projectTitle}
                    </h3>
                    <p className="text-gray-400 text-sm mt-2">
                      Client: <span className="text-white font-medium">{project.name}</span>
                    </p>
                    <div className="mt-auto pt-4">
                       <div className="flex items-center text-sm text-green-400">
                        <CheckBadgeIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                        <span>Completed {new Date(project.completedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
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

      {/* Footer Section */}
      <footer className="bg-gray-900 border-t border-gray-800/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p className="mb-2">
            MADE IN CANADA &bull; <a href="#" className="hover:text-indigo-400 transition-colors duration-300">Privacy Policy</a> &bull; Copyright 2025 514085 BC LTD DBA Studiothink® CREATIVE
          </p>
          <p className="text-xs text-gray-600">
            All rights reserved.
          </p>
        </div>
      </footer>

      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
};

export default Portfolio;