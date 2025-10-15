import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectDetailModal from './ProjectDetailModal'; // Import the modal

import { 
  LockClosedIcon, 
  ArrowRightOnRectangleIcon, 
  BellIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  SparklesIcon, 
  TrashIcon, 
  CheckIcon,
  EyeIcon,
  ChartBarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  CpuChipIcon,
  RocketLaunchIcon,
  StarIcon,
  TrophyIcon,
  PlusCircleIcon,
  XCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BriefcaseIcon,
  WrenchScrewdriverIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';

// Enhanced Loading Animation
const DashboardLoader = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="flex flex-col items-center">
      {/* Animated Dashboard Icon */}
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-400 border-r-purple-400 rounded-full animate-spin"></div>
        <div className="absolute inset-3 border-4 border-transparent border-t-pink-400 border-l-indigo-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
        <div className="absolute inset-6 border-4 border-transparent border-b-green-400 border-r-yellow-400 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
        <ChartBarIcon className="absolute inset-8 w-16 h-16 text-white animate-pulse" />
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-4 animate-pulse">Loading Dashboard</h3>
      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  </div>
);

// Floating Background Elements
const FloatingElements = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {/* Gradient Orbs */}
    <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: '4s' }}></div>
    <div className="absolute top-1/3 right-10 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
    <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-pink-500/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
    <div className="absolute bottom-10 right-1/3 w-28 h-28 bg-indigo-500/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '3s' }}></div>
    
    {/* Floating Icons */}
    {[
      { Icon: DocumentTextIcon, position: 'top-20 left-20', delay: '0s' },
      { Icon: UserGroupIcon, position: 'top-40 right-32', delay: '1s' },
      { Icon: TrophyIcon, position: 'bottom-32 left-32', delay: '2s' },
      { Icon: RocketLaunchIcon, position: 'bottom-20 right-20', delay: '3s' },
    ].map(({ Icon, position, delay }, index) => (
      <div
        key={index}
        className={`absolute ${position} opacity-10 animate-bounce`}
        style={{ animationDelay: delay, animationDuration: '3s' }}
      >
        <Icon className="w-8 h-8 text-blue-400" />
      </div>
    ))}
    
    {/* Animated Particles */}
    {[...Array(30)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-white/10 rounded-full animate-ping"
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

// Enhanced Login Form
const LoginForm = ({ password, setPassword, handlePasswordSubmit, error }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center px-4 relative overflow-hidden">
    <FloatingElements />
    
    <div className="relative z-10 w-full max-w-md">
      <div className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-3xl p-8 transform transition-all">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full">
              <LockClosedIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text mb-2">
            Admin Portal
          </h2>
          <p className="text-gray-400">Secure access required to manage projects</p>
        </div>

        {/* Form */}
        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          <div className="relative group">
            <input
              id="password-admin"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer w-full bg-gray-700/50 backdrop-blur-sm border-2 border-gray-600/50 rounded-2xl px-6 py-4 text-white placeholder-transparent focus:border-indigo-400 focus:ring-0 transition-all duration-300 focus:shadow-lg focus:shadow-indigo-500/20"
              placeholder="Admin Password"
            />
            <label className="absolute left-6 -top-3 bg-gray-800 px-2 text-sm text-indigo-400 font-medium transition-all duration-300">
              Admin Password
            </label>
            
            {/* Animated border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-4 text-center animate-shake">
              <p className="text-red-300 font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="group relative w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/25"
          >
            <span className="relative z-10 flex items-center justify-center">
              <LockClosedIcon className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Access Dashboard
            </span>
            
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </button>
        </form>

        {/* Security Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-700/30 backdrop-blur-sm rounded-full border border-gray-600/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
            <span className="text-gray-400 text-sm">Secure Connection</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Enhanced Stats Card
const StatsCard = ({ name, count, icon: Icon, color, trend }) => (
  <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:scale-105">
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${color} mr-4 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400 truncate">{name}</p>
            <p className="text-3xl font-bold text-white">{count}</p>
          </div>
        </div>
      </div>
    </div>
    
    {/* Progress bar */}
    <div className="h-1 bg-gray-700">
      <div 
        className={`h-full bg-gradient-to-r ${color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
      ></div>
    </div>
  </div>
);

// Image Slider Component (for Admin)
const ImageSliderAdmin = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video bg-gray-700/50 rounded-lg flex items-center justify-center mb-4">
        <BriefcaseIcon className="w-10 h-10 text-gray-500" />
        <span className="ml-2 text-gray-400">No images provided</span>
      </div>
    );
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative h-48 w-full overflow-hidden group/slider mb-4 rounded-lg">
      <div
        className="w-full h-full bg-cover bg-center transition-transform duration-500 ease-in-out"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      ></div>
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full opacity-0 group-hover/slider:opacity-100 transition-opacity"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full opacity-0 group-hover/slider:opacity-100 transition-opacity"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
};

// Enhanced Project Card
const ProjectCard = ({ project, updateProjectStatus, onSelectProject }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrls, setImageUrls] = useState(project.imageUrls || []);
  const [techStack, setTechStack] = useState(project.techStack || []);
  const [videoUrl, setVideoUrl] = useState(project.videoUrl || '');

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  const addImageUrlField = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeImageUrlField = (index) => {
    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImageUrls);
  };

  const handleTechStackChange = (index, value) => {
    const newTechStack = [...techStack];
    newTechStack[index] = value;
    setTechStack(newTechStack);
  };

  const addTechStackField = () => {
    setTechStack([...techStack, '']);
  };

  const removeTechStackField = (index) => {
    const newTechStack = techStack.filter((_, i) => i !== index);
    setTechStack(newTechStack);
  };

  const saveChanges = () => {
    const filteredUrls = imageUrls.filter(url => url.trim() !== '');
    const filteredTech = techStack.filter(tech => tech.trim() !== '');
    updateProjectStatus(project._id, project.status, { imageUrls: filteredUrls, techStack: filteredTech,videoUrl: videoUrl });
    setIsEditing(false);
  };
  
  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending': 
        return { 
          classes: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50', 
          icon: ClockIcon,
          pulse: true
        };
      case 'approved': 
        return { 
          classes: 'bg-blue-500/20 text-blue-300 border-blue-500/50', 
          icon: CheckCircleIcon,
          pulse: false
        };
      case 'completed': 
        return { 
          classes: 'bg-green-500/20 text-green-300 border-green-500/50', 
          icon: SparklesIcon,
          pulse: false
        };
      default: 
        return { 
          classes: 'bg-gray-500/20 text-gray-300 border-gray-500/50', 
          icon: DocumentTextIcon,
          pulse: false
        };
    }
  };

  const statusConfig = getStatusConfig(project.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="group bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:scale-[1.02]">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors duration-300 mb-2">
              {project.projectTitle}
            </h3>
            <div className="flex flex-col space-y-1 text-sm text-gray-400">
              <span className="flex items-center">
                <UserGroupIcon className="w-4 h-4 mr-2" />
                {project.name}
              </span>
              <span className="flex items-center">
                <CalendarDaysIcon className="w-4 h-4 mr-2" />
                {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className={`px-3 py-1 rounded-full border text-xs font-semibold flex items-center ${statusConfig.classes}`}>
              <StatusIcon className={`w-3 h-3 mr-1 ${statusConfig.pulse ? 'animate-pulse' : ''}`} />
              {project.status}
            </div>
          </div>
        </div>

        {/* Image & Tech Stack Display/Edit Section */}
        {isEditing ? (
          <div className="mb-4 p-4 bg-gray-700/50 rounded-lg space-y-6">
            {/* Video URL Editor */}
            <div>
              <h4 className="text-white font-semibold mb-3">Edit Video URL</h4>
              <input
                type="text"
                placeholder="YouTube or Vimeo URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white text-sm"
              />
            </div>

            {/* Image URL Editor */}
            <div>
              <h4 className="text-white font-semibold mb-3">Edit Image URLs</h4>
              <div className="space-y-3">
                {imageUrls.map((url, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder={`Image URL ${index + 1}`}
                      value={url}
                      onChange={(e) => handleImageUrlChange(index, e.target.value)}
                      className="flex-grow bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white text-sm"
                    />
                    <button type="button" onClick={() => removeImageUrlField(index)} className="text-red-400">
                      <XCircleIcon className="w-6 h-6" />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={addImageUrlField} className="flex items-center text-indigo-400 text-sm mt-2">
                <PlusCircleIcon className="w-5 h-5 mr-1" /> Add Image
              </button>
            </div>

            {/* Tech Stack Editor */}
            <div>
              <h4 className="text-white font-semibold mb-3">Edit Tech Stack</h4>
              <div className="space-y-3">
                {techStack.map((tech, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder={`Technology ${index + 1}`}
                      value={tech}
                      onChange={(e) => handleTechStackChange(index, e.target.value)}
                      className="flex-grow bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white text-sm"
                    />
                    <button type="button" onClick={() => removeTechStackField(index)} className="text-red-400">
                      <XCircleIcon className="w-6 h-6" />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={addTechStackField} className="flex items-center text-indigo-400 text-sm mt-2">
                <PlusCircleIcon className="w-5 h-5 mr-1" /> Add Technology
              </button>
            </div>

            <div className="flex justify-end">
              <button onClick={saveChanges} className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg">
                Save All Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <ImageSliderAdmin images={project.imageUrls} />
            {project.techStack && project.techStack.length > 0 && (
              <div className="my-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-600/50 text-indigo-300 text-xs font-medium rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsEditing(true)} className="flex items-center text-indigo-400 text-sm hover:text-indigo-300">
                <WrenchScrewdriverIcon className="w-4 h-4 mr-1" />
                Edit Details
              </button>
              <button onClick={() => onSelectProject(project)} className="flex items-center text-green-400 text-sm hover:text-green-300">
                <EyeIcon className="w-4 h-4 mr-1" />
                Preview
              </button>
            </div>
          </div>
        )}

        {/* Project Details */}
        <div className="mb-4">
          <p className={`text-gray-300 text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
            {project.projectDetails}
          </p>
          {project.projectDetails.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-indigo-400 text-sm mt-2 hover:text-indigo-300 transition-colors duration-200"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          )}
        </div>

        {/* Contact Info */}
        <div className="bg-gray-700/30 rounded-xl p-3 mb-4 space-y-2">
          <p className="text-sm text-gray-400">
            Client: <span className="text-white font-medium">{project.name}</span>
            {project.companyName && ` (${project.companyName})`}
          </p>
          <p className="text-sm text-gray-400">
            Email: <a href={`mailto:${project.email}`} className="text-indigo-400 hover:underline">{project.email}</a>
          </p>
          {project.phoneNumber && (
            <p className="text-sm text-gray-400">
              Phone: <span className="text-white font-medium">{project.phoneNumber}</span>
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {project.status === 'pending' && (
            <>
              <button
                onClick={() => updateProjectStatus(project._id, 'approved')}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <CheckIcon className="w-4 h-4 mr-2" />
                Approve
              </button>
              <button
                onClick={() => updateProjectStatus(project._id, 'declined')}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gray-700 hover:bg-red-600 text-gray-300 hover:text-white text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105"
              >
                <TrashIcon className="w-4 h-4 mr-2" />
                Decline
              </button>
            </>
          )}
          
          {project.status === 'approved' && (
            <button
              onClick={() => updateProjectStatus(project._id, 'completed')}
              className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <SparklesIcon className="w-5 h-5 mr-2" />
              Mark as Completed
            </button>
          )}
          
          {project.status === 'completed' && (
            <div className="w-full inline-flex items-center justify-center px-4 py-3 bg-green-500/20 border border-green-500/50 text-green-300 font-medium rounded-xl">
              <TrophyIcon className="w-5 h-5 mr-2" />
              Project Completed
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null); // State for modal


  const ADMIN_PASSWORD = 'admin123';

  useEffect(() => {
    if (sessionStorage.getItem('adminAccess') === 'true') {
      setIsAuthenticated(true);
      setIsVisible(true);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedStatus === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.status === selectedStatus));
    }
  }, [projects, selectedStatus]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('adminAccess', 'true');
      setIsAuthenticated(true);
      setIsVisible(true);
      setError('');
    } else {
      setError('Invalid password. Access denied.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAccess');
    setIsAuthenticated(false);
    setPassword('');
    setIsVisible(false);
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5001/api/projects');
      setProjects(response.data);
    } catch (err) {
      setError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const updateProjectStatus = async (projectId, newStatus, data) => {
    if (newStatus === 'declined') {
      if (!window.confirm('⚠️ Are you sure you want to decline and permanently delete this project?\n\nThis action cannot be undone and will remove all project data.')) {
        return;
      }
    }

    const originalProjects = [...projects];
    const payload = { status: newStatus, ...data };

    try {
      await axios.put(`http://localhost:5001/api/projects/${projectId}/status`, payload);
      
      if (newStatus === 'declined') {
        setProjects(projects.filter(p => p._id !== projectId));
      } else {
        setProjects(projects.map(p => {
          if (p._id === projectId) {
            const updatedProject = { ...p, ...payload };
            if (data?.imageUrls) updatedProject.imageUrls = data.imageUrls;
            if (data?.techStack) updatedProject.techStack = data.techStack;
            if (data?.videoUrl !== undefined) updatedProject.videoUrl = data.videoUrl;
            return updatedProject;
          }
          return p;
        }));
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Changes reverted.');
      setProjects(originalProjects);
      setTimeout(() => setError(''), 5000);
    }
  };

  const getStatusCount = (status) => projects.filter(p => p.status === status).length;

  if (!isAuthenticated) {
    return (
      <LoginForm
        password={password}
        setPassword={setPassword}
        handlePasswordSubmit={handlePasswordSubmit}
        error={error}
      />
    );
  }

  if (loading) {
    return <DashboardLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 relative overflow-hidden">
      <FloatingElements />
      
      <div className={`relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Header */}
        <div className="bg-gray-800/30 backdrop-blur-md border-b border-gray-700/50 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                  <ChartBarIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
                    Admin Dashboard
                  </h1>
                  <p className="text-gray-400 mt-1">Manage projects and monitor progress</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="group inline-flex items-center px-4 py-2 bg-gray-700/50 hover:bg-red-600/20 border border-gray-600/50 hover:border-red-500/50 text-gray-300 hover:text-red-300 font-medium rounded-xl transition-all duration-300"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              name="Pending"
              count={getStatusCount('pending')}
              icon={ClockIcon}
              color="from-yellow-500 to-orange-500"
            />
            <StatsCard
              name="Approved"
              count={getStatusCount('approved')}
              icon={CheckCircleIcon}
              color="from-blue-500 to-indigo-500"
            />
            <StatsCard
              name="Completed"
              count={getStatusCount('completed')}
              icon={SparklesIcon}
              color="from-green-500 to-emerald-500"
            />
            <StatsCard
              name="Total Projects"
              count={projects.length}
              icon={BellIcon}
              color="from-purple-500 to-pink-500"
            />
          </div>

          {/* Filter Section */}
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-white flex-shrink-0">Project Management</h2>
              <div className="w-full sm:w-auto bg-gray-900/50 p-1.5 rounded-full flex items-center space-x-2">
                {[
                  { value: 'all', label: 'All', count: projects.length },
                  { value: 'pending', label: 'Pending', count: getStatusCount('pending') },
                  { value: 'approved', label: 'Approved', count: getStatusCount('approved') },
                  { value: 'completed', label: 'Completed', count: getStatusCount('completed') },
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setSelectedStatus(filter.value)}
                    className={`relative w-full sm:w-auto text-center px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 focus:outline-none ${
                      selectedStatus === filter.value
                        ? 'text-white'
                        : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                    }`}
                  >
                    {selectedStatus === filter.value && (
                      <span className="absolute inset-0 bg-indigo-600 rounded-full -z-10" />
                    )}
                    <span className="relative z-10 flex items-center justify-center">
                      {filter.label}
                      <span className={`ml-2 text-xs font-bold px-2 py-0.5 rounded-full ${
                        selectedStatus === filter.value ? 'bg-indigo-400/50 text-white' : 'bg-gray-700 text-gray-200'
                      }`}>
                        {filter.count}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-4 mb-8 text-center animate-pulse">
              <p className="text-red-300 font-medium">{error}</p>
            </div>
          )}

          {/* Projects Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredProjects.length === 0 ? (
              <div className="lg:col-span-2 text-center py-16 px-4 bg-gray-800/20 rounded-2xl border border-gray-700/30">
                <DocumentTextIcon className="mx-auto h-16 w-16 text-gray-500 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">
                  {selectedStatus === 'all' ? 'No Projects Yet' : `No ${selectedStatus} Projects`}
                </h3>
                <p className="text-gray-400">
                  {selectedStatus === 'all' 
                    ? 'Projects will appear here once clients submit them.' 
                    : `No projects with ${selectedStatus} status found.`
                  }
                </p>
              </div>
            ) : (
              filteredProjects.map((project, index) => (
                <div
                  key={project._id}
                  className="animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProjectCard project={project} updateProjectStatus={updateProjectStatus} onSelectProject={setSelectedProject}/>
                </div>
              ))
            )}
          </div>

        </main>
      </div>

      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
};

export default ProjectManager;