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
  XCircleIcon,
  PaperClipIcon // Import PaperClipIcon
} from '@heroicons/react/24/solid';

import FileUpload from './FileUpload'; 


// ...existing code...
const FloatingInput = ({ type = "text", name, placeholder, value, onChange, required = false, rows }) => {
// ...existing code...
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

  const [additionalFile, setAdditionalFile] = useState(null); // State for the additional file
  const [status, setStatus] = useState({ message: '', error: '', loading: false });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const resetForm = () => {
    setFormData({
      name: '', email: '', phoneNumber: '', companyName: '', projectTitle: '',
      projectDetails: '', startDate: '', endDate: '', imageUrls: [''],
      budget: '',
    });
    setAdditionalFile(null); // Reset the additional file state
    setStatus({ message: '', error: '', loading: false });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (uploadedUrls) => {
    setFormData(prev => {
      const existingValidUrls = prev.imageUrls.filter(url => url.trim() !== '');
      const newImageUrls = [...existingValidUrls, ...uploadedUrls];
      return { ...prev, imageUrls: newImageUrls.length > 0 ? newImageUrls : [''] };
    });
  };

  const handleManualUrlChange = (index, value) => {
    const newUrls = [...formData.imageUrls];
    newUrls[index] = value;
    setFormData(prev => ({ ...prev, imageUrls: newUrls }));
  };

  const addManualUrlField = () => {
    setFormData(prev => ({ ...prev, imageUrls: [...prev.imageUrls, ''] }));
  };

  const removeImageUrl = (indexToRemove) => {
    setFormData(prev => {
      const newUrls = prev.imageUrls.filter((_, index) => index !== indexToRemove);
      if (newUrls.length === 0) {
        return { ...prev, imageUrls: [''] };
      }
      return { ...prev, imageUrls: newUrls };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: '', error: '', loading: true });

    try {
      const submissionFormData = new FormData();

      // Append all text fields from the formData state
      Object.keys(formData).forEach(key => {
        if (key !== 'imageUrls') {
          submissionFormData.append(key, formData[key]);
        }
      });

      // Append filtered image URLs as a JSON string
      const finalImageUrls = formData.imageUrls.filter(url => url.trim() !== '');
      submissionFormData.append('imageUrls', JSON.stringify(finalImageUrls));

      // Append the additional file if it exists
      if (additionalFile) {
        submissionFormData.append('additionalFile', additionalFile);
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Axios will automatically set the 'Content-Type' to 'multipart/form-data'
      const res = await axios.post('http://localhost:5001/api/projects', submissionFormData);
      
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
        
        <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className={`max-w-4xl w-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-indigo-500/20 backdrop-blur-sm rounded-full border border-indigo-500/30 mb-6">
                <SparklesIcon className="w-5 h-5 text-indigo-400 mr-2" />
                <span className="text-indigo-300 font-medium">Ready to innovate?</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text mb-6 leading-tight">
                Let's Create Something<br /><span className="text-white">Extraordinary</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Transform your ideas into digital reality. Share your vision with us and let's craft something that will revolutionize your business.
              </p>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-3xl p-8 md:p-12 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                <div className="grid md:grid-cols-2 gap-6">
                  <FloatingInput type="text" name="name" placeholder="Your Full Name" value={formData.name} onChange={handleChange} required />
                  <FloatingInput type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                  <FloatingInput type="text" name="companyName" placeholder="Company Name (Optional)" value={formData.companyName} onChange={handleChange} />
                  <FloatingInput type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
                </div>

                <FloatingInput type="text" name="projectTitle" placeholder="Project Title" value={formData.projectTitle} onChange={handleChange} required />
                <FloatingInput type="textarea" name="projectDetails" placeholder="Tell us about your project vision..." value={formData.projectDetails} onChange={handleChange} rows={4} required />

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">Estimated Budget (USD)</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['$1k - $5k', '$5k - $10k', '$10k - $15k', '$15k+'].map((range) => (
                      <div key={range}>
                        <input type="radio" id={range} name="budget" value={range} checked={formData.budget === range} onChange={handleChange} className="hidden peer" required />
                        <label htmlFor={range} className="block text-center cursor-pointer p-4 border-2 border-gray-700/50 rounded-2xl text-gray-300 font-semibold transition-all duration-300 peer-checked:border-indigo-500 peer-checked:bg-indigo-500/20 peer-checked:text-white hover:border-indigo-500/50">{range}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-3">Project Start Date</label>
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required className="w-full bg-gray-800/50 backdrop-blur-sm border-2 border-gray-700/50 rounded-2xl px-6 py-4 text-white focus:border-indigo-400 focus:ring-0 transition-all duration-300 focus:shadow-lg focus:shadow-indigo-500/20" style={{ colorScheme: 'dark' }} />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-3">Project End Date</label>
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required className="w-full bg-gray-800/50 backdrop-blur-sm border-2 border-gray-700/50 rounded-2xl px-6 py-4 text-white focus:border-indigo-400 focus:ring-0 transition-all duration-300 focus:shadow-lg focus:shadow-indigo-500/20" style={{ colorScheme: 'dark' }} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">Project Images (Optional)</label>
                  <div className="mb-6">
                    <FileUpload onUpload={handleImageUpload} multiple={true} />
                  </div>
                  {(formData.imageUrls.length > 1 || formData.imageUrls[0] !== '') && (
                    <div className="border-t border-gray-700/50 pt-6 mt-8">
                      <h4 className="text-sm font-medium text-gray-300 mb-3">Image Previews & Links:</h4>
                      <div className="space-y-4">
                        {formData.imageUrls.map((url, index) => {
                          if (url.trim() === '' && index !== formData.imageUrls.length - 1) return null;
                          const isUrlValid = url && (url.startsWith('http') || url.startsWith('https'));
                          return (
                            <div key={index}>
                              {isUrlValid ? (
                                <div className="relative group w-full aspect-video bg-gray-900 rounded-lg">
                                  <img src={url} alt={`Preview ${index + 1}`} className="rounded-lg object-cover w-full h-full" />
                                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button type="button" onClick={() => removeImageUrl(index)} className="text-red-400 hover:text-red-300 p-2 bg-black/50 rounded-full"><XCircleIcon className="w-6 h-6" /></button>
                                  </div>
                                </div>
                              ) : (
                                <div className="w-full flex items-center space-x-3">
                                  <FloatingInput type="text" name={`manualUrl-${index}`} placeholder={`Image URL ${index + 1}`} value={url} onChange={(e) => handleManualUrlChange(index, e.target.value)} />
                                  <button type="button" onClick={() => removeImageUrl(index)} className="text-red-400 hover:text-red-300"><XCircleIcon className="w-7 h-7" /></button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <button type="button" onClick={addManualUrlField} className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors duration-200 mt-4">
                    <PlusCircleIcon className="w-6 h-6 mr-2" /> Add Image URL Field
                  </button>
                </div>

                {/* Additional File Upload Section */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-3">
                    <PaperClipIcon className="w-5 h-5 mr-2 text-gray-400"/>
                    Attach Document (Optional)
                  </label>
                  <p className="text-sm text-gray-400 mb-4">You can attach a single document (e.g., PDF, DOCX) with more project details.</p>
                  <div className="relative bg-gray-800/50 border-2 border-dashed border-gray-700/50 rounded-2xl p-4 text-center cursor-pointer hover:border-indigo-400 transition-all">
                    <input 
                      type="file" 
                      onChange={(e) => setAdditionalFile(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {additionalFile ? (
                      <div className="text-green-400 font-medium flex items-center justify-center">
                        {additionalFile.name}
                        <button type="button" onClick={() => setAdditionalFile(null)} className="ml-3 text-red-400 hover:text-red-300"><XCircleIcon className="w-5 h-5"/></button>
                      </div>
                    ) : (
                      <div className="text-gray-400">
                        Click to select a file
                      </div>
                    )}
                  </div>
                </div>

                {status.error && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-4 text-center">
                    <p className="text-red-300 font-medium">{status.error}</p>
                  </div>
                )}

                <div className="pt-6">
                  <button type="submit" disabled={status.loading} className="group relative w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-6 px-8 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                    <span className="relative z-10 flex items-center justify-center text-lg">
                      {status.loading ? (
                        <><div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>Launching Your Vision...</>
                      ) : (
                        <><RocketLaunchIcon className="w-6 h-6 mr-3 group-hover:animate-bounce" />Launch Project<ArrowRightIcon className="w-6 h-6 ml-3 transition-transform duration-300 group-hover:translate-x-2" /></>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  </button>
                </div>

                <div className="text-center pt-4">
                  <div className="inline-flex items-center px-6 py-3 bg-gray-700/30 backdrop-blur-sm rounded-full border border-gray-600/30">
                    <CheckCircleIcon className="w-5 h-5 text-green-400 mr-2" />
                    <span className="text-gray-300 text-sm">Free consultation • 24h response • No commitment required</span>
                  </div>
                </div>
              </form>
            </div>

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