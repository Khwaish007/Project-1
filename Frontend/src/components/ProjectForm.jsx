import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  ArrowRightIcon, 
  CheckCircleIcon, 
  SparklesIcon,
  RocketLaunchIcon,
  CodeBracketIcon,
  CpuChipIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  LightBulbIcon,
  StarIcon,
  PlusCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/solid';

// Enhanced Loader with rotating elements
const FullScreenLoader = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center z-50">
    <div className="flex flex-col items-center">
      {/* Rotating outer ring */}
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-400 border-r-purple-400 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-transparent border-t-pink-400 border-l-indigo-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        <div className="absolute inset-4 border-4 border-transparent border-b-green-400 border-r-yellow-400 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
        <div className="absolute inset-6 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
      </div>
      
      {/* Pulsing text */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2 animate-pulse">Crafting Your Vision</h3>
        <div className="flex items-center space-x-1 text-gray-300">
          <span className="animate-bounce" style={{ animationDelay: '0s' }}>●</span>
          <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</span>
          <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>●</span>
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

// Enhanced Success Prompt with celebration effects
const SuccessPrompt = ({ onReset }) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 flex items-center justify-center z-50 p-4">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-bounce opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>
      )}

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-3xl shadow-2xl p-8 sm:p-12 text-center max-w-lg w-full transform transition-all backdrop-blur-sm">
        {/* Success Icon with pulse effect */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-25"></div>
          <CheckCircleIcon className="relative mx-auto h-20 w-20 text-green-400 animate-bounce" />
        </div>

        <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          Mission Accomplished!
        </h3>
        
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, i) => (
            <StarIcon 
              key={i} 
              className="w-6 h-6 text-yellow-400 animate-pulse mx-1" 
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
          Your project details have been received! Our team will review your vision and reach out within 24 hours.
        </p>

        <div className="bg-gray-700/50 rounded-2xl p-4 mb-6">
          <p className="text-sm text-gray-400">
            🚀 What's next? We'll analyze your requirements and prepare a detailed proposal tailored to your needs.
          </p>
        </div>

        <button
          onClick={onReset}
          className="w-full group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <span className="relative z-10 flex items-center justify-center">
            <RocketLaunchIcon className="w-5 h-5 mr-2" />
            Launch Another Project
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </div>
  );
};

// Floating background shapes
const FloatingShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
    <div className="absolute top-1/4 right-10 w-16 h-16 bg-purple-500/10 rounded-full animate-bounce" style={{ animationDuration: '6s' }}></div>
    <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-pink-500/10 rounded-full animate-pulse" style={{ animationDuration: '5s' }}></div>
    <div className="absolute bottom-10 right-1/4 w-18 h-18 bg-indigo-500/10 rounded-full animate-bounce" style={{ animationDuration: '7s' }}></div>
    
    {/* Animated particles */}
    {[...Array(30)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-white/20 rounded-full animate-ping"
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

// Rotating service icons
const ServiceIcons = () => {
  const icons = [
    { Icon: GlobeAltIcon, color: 'text-blue-400', delay: '0s' },
    { Icon: DevicePhoneMobileIcon, color: 'text-green-400', delay: '1s' },
    { Icon: CodeBracketIcon, color: 'text-purple-400', delay: '2s' },
    { Icon: CpuChipIcon, color: 'text-pink-400', delay: '3s' },
    { Icon: LightBulbIcon, color: 'text-yellow-400', delay: '4s' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {icons.map(({ Icon, color, delay }, index) => (
        <div
          key={index}
          className={`absolute ${color} opacity-20 animate-bounce`}
          style={{
            left: `${15 + (index * 15)}%`,
            top: `${20 + (index % 2) * 60}%`,
            animationDelay: delay,
            animationDuration: '3s'
          }}
        >
          <Icon className="w-8 h-8" />
        </div>
      ))}
    </div>
  );
};

// Enhanced input component with floating label
const FloatingInput = ({ type = "text", name, placeholder, value, onChange, required = false, rows }) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    setHasValue(value && value.length > 0);
  }, [value]);

  const InputComponent = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="relative group">
      <InputComponent
        type={type !== 'textarea' ? type : undefined}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full bg-gray-800/50 backdrop-blur-sm border-2 border-gray-700/50 rounded-2xl px-6 py-4 text-white placeholder-transparent focus:border-indigo-400 focus:ring-0 transition-all duration-300 focus:shadow-lg focus:shadow-indigo-500/20 resize-none"
        placeholder={placeholder}
      />
      <label
        className={`absolute left-6 transition-all duration-300 pointer-events-none ${
          focused || hasValue
            ? '-top-3 text-sm bg-gray-900 px-2 text-indigo-400 font-medium'
            : 'top-4 text-gray-400'
        }`}
      >
        {placeholder}
      </label>
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
    </div>
  );
};

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    projectTitle: '',
    projectDetails: '',
    startDate: '',
    endDate: '',
    imageUrls: [''], 
    budget: '',
  });
  const [status, setStatus] = useState({ message: '', error: '', loading: false });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phoneNumber: '',
      companyName: '',
      projectTitle: '',
      projectDetails: '',
      startDate: '',
      endDate: '',
      imageUrls: [''],
      budget: '',
    });
    setStatus({ message: '', error: '', loading: false });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...formData.imageUrls];
    newImageUrls[index] = value;
    setFormData({ ...formData, imageUrls: newImageUrls });
  };

  const addImageUrlField = () => {
    setFormData({ ...formData, imageUrls: [...formData.imageUrls, ''] });
  };

  const removeImageUrlField = (index) => {
    const newImageUrls = formData.imageUrls.filter((_, i) => i !== index);
    setFormData({ ...formData, imageUrls: newImageUrls });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: '', error: '', loading: true });
    try {
      // Filter out empty image URLs before submitting
      const submissionData = {
        ...formData,
        imageUrls: formData.imageUrls.filter(url => url.trim() !== ''),
      };
      await new Promise(resolve => setTimeout(resolve, 2000));
      const res = await axios.post('http://localhost:5001/api/projects', submissionData);
      setStatus({ message: res.data.message, error: '', loading: false });
    } catch (err) {
      setStatus({
        message: '',
        error: err.response?.data?.error || 'Failed to submit project. Please try again.',
        loading: false
      });
    }
  };

  if (status.message) {
    return <SuccessPrompt onReset={resetForm} />;
  }

  return (
    <>
      {status.loading && <FullScreenLoader />}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 relative overflow-hidden">
        <FloatingShapes />
        <ServiceIcons />
        
        {/* Main content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className={`max-w-4xl w-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-indigo-500/20 backdrop-blur-sm rounded-full border border-indigo-500/30 mb-6">
                <SparklesIcon className="w-5 h-5 text-indigo-400 mr-2" />
                <span className="text-indigo-300 font-medium">Ready to innovate?</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text mb-6 leading-tight">
                Let's Create Something
                <br />
                <span className="text-white">Extraordinary</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Transform your ideas into digital reality. Share your vision with us and let's craft 
                something that will revolutionize your business.
              </p>
            </div>

            {/* Form Container */}
            <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-3xl p-8 md:p-12 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Personal Information Section */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FloatingInput
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <FloatingInput
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <FloatingInput
                    type="text"
                    name="companyName"
                    placeholder="Company Name (Optional)"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                  <FloatingInput
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Project Information */}
                <FloatingInput
                  type="text"
                  name="projectTitle"
                  placeholder="Project Title"
                  value={formData.projectTitle}
                  onChange={handleChange}
                  required
                />

                <FloatingInput
                  type="textarea"
                  name="projectDetails"
                  placeholder="Tell us about your project vision..."
                  value={formData.projectDetails}
                  onChange={handleChange}
                  rows={4}
                  required
                />

                {/* Budget Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Estimated Budget (USD)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['$1k - $5k', '$5k - $10k', '$10k - $15k', '$15k+'].map((range) => (
                      <div key={range}>
                        <input
                          type="radio"
                          id={range}
                          name="budget"
                          value={range}
                          checked={formData.budget === range}
                          onChange={handleChange}
                          className="hidden peer"
                          required
                        />
                        <label
                          htmlFor={range}
                          className="block text-center cursor-pointer p-4 border-2 border-gray-700/50 rounded-2xl text-gray-300 font-semibold transition-all duration-300 peer-checked:border-indigo-500 peer-checked:bg-indigo-500/20 peer-checked:text-white hover:border-indigo-500/50"
                        >
                          {range}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date Range Section */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Project Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800/50 backdrop-blur-sm border-2 border-gray-700/50 rounded-2xl px-6 py-4 text-white focus:border-indigo-400 focus:ring-0 transition-all duration-300 focus:shadow-lg focus:shadow-indigo-500/20"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Project End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800/50 backdrop-blur-sm border-2 border-gray-700/50 rounded-2xl px-6 py-4 text-white focus:border-indigo-400 focus:ring-0 transition-all duration-300 focus:shadow-lg focus:shadow-indigo-500/20"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                </div>

                {/* Image URLs Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Project Image URLs (Optional)
                  </label>
                  <div className="space-y-4">
                    {formData.imageUrls.map((url, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <FloatingInput
                          type="text"
                          name={`imageUrl-${index}`}
                          placeholder={`Image URL ${index + 1}`}
                          value={url}
                          onChange={(e) => handleImageUrlChange(index, e.target.value)}
                        />
                        {formData.imageUrls.length > 1 && (
                          <button type="button" onClick={() => removeImageUrlField(index)} className="text-red-400 hover:text-red-300">
                            <XCircleIcon className="w-7 h-7" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addImageUrlField}
                      className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                    >
                      <PlusCircleIcon className="w-6 h-6 mr-2" />
                      Add Another Image
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {status.error && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-4 text-center">
                    <p className="text-red-300 font-medium">{status.error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={status.loading}
                    className="group relative w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-6 px-8 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <span className="relative z-10 flex items-center justify-center text-lg">
                      {status.loading ? (
                        <>
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                          Launching Your Vision...
                        </>
                      ) : (
                        <>
                          <RocketLaunchIcon className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                          Launch Project
                          <ArrowRightIcon className="w-6 h-6 ml-3 transition-transform duration-300 group-hover:translate-x-2" />
                        </>
                      )}
                    </span>
                    
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  </button>
                </div>

                {/* Additional Info */}
                <div className="text-center pt-4">
                  <div className="inline-flex items-center px-6 py-3 bg-gray-700/30 backdrop-blur-sm rounded-full border border-gray-600/30">
                    <CheckCircleIcon className="w-5 h-5 text-green-400 mr-2" />
                    <span className="text-gray-300 text-sm">Free consultation • 24h response • No commitment required</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 text-center">
              <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30">
                <div className="text-2xl font-bold text-white mb-1">50+</div>
                <div className="text-gray-400 text-sm">Projects Delivered</div>
              </div>
              <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30">
                <div className="text-2xl font-bold text-white mb-1">24h</div>
                <div className="text-gray-400 text-sm">Response Time</div>
              </div>
              <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30">
                <div className="text-2xl font-bold text-white mb-1">100%</div>
                <div className="text-gray-400 text-sm">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectForm;