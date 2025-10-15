import React, { useState } from 'react';
import axios from 'axios';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  RocketLaunchIcon,
  CheckCircleIcon
} from '@heroicons/react/24/solid';

const FloatingInput = ({ type = "text", name, placeholder, value, onChange, required = false, rows }) => {
  const InputComponent = type === 'textarea' ? 'textarea' : 'input';
  return (
    <div className="relative">
      <InputComponent
        type={type !== 'textarea' ? type : undefined}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className="peer w-full bg-gray-800/50 border-2 border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-transparent focus:border-indigo-400 focus:ring-0 transition-all"
        placeholder={placeholder}
      />
      <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${value ? '-top-2.5 text-xs bg-gray-900 px-1 text-indigo-400' : 'top-3.5 text-gray-400'}`}>
        {placeholder}
      </label>
    </div>
  );
};

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ submitted: false, loading: false, error: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitted: false, loading: true, error: '' });
    try {
      await axios.post('http://localhost:5001/api/contact', formData);
      setStatus({ submitted: true, loading: false, error: '' });
    } catch (err) {
      setStatus({ 
        submitted: false, 
        loading: false, 
        error: err.response?.data?.error || 'Failed to send message. Please try again.' 
      });
    }
  };

  if (status.submitted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-center px-4">
        <div className="bg-gray-800/50 p-12 rounded-2xl border border-gray-700/50">
          <CheckCircleIcon className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">Thank You!</h2>
          <p className="text-gray-300">Your message has been sent. We'll get back to you shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-300">We'd love to hear from you. Let's talk about how we can help.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start p-6 bg-gray-800/50 rounded-2xl border border-gray-700/50">
              <MapPinIcon className="w-8 h-8 text-indigo-400 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-white">Our Office</h3>
                <p className="text-gray-400">123 Innovation Drive, Vancouver, BC, Canada</p>
              </div>
            </div>
            <div className="flex items-start p-6 bg-gray-800/50 rounded-2xl border border-gray-700/50">
              <EnvelopeIcon className="w-8 h-8 text-indigo-400 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-white">Email Us</h3>
                <a href="mailto:contact@studiothink.creative" className="text-gray-400 hover:text-indigo-300 transition">contact@studiothink.creative</a>
              </div>
            </div>
            <div className="flex items-start p-6 bg-gray-800/50 rounded-2xl border border-gray-700/50">
              <PhoneIcon className="w-8 h-8 text-indigo-400 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-white">Call Us</h3>
                <p className="text-gray-400">(123) 456-7890</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <FloatingInput name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
              <FloatingInput type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
              <FloatingInput name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
              <FloatingInput type="textarea" name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required rows={5} />
              
              {status.error && <p className="text-red-400 text-sm text-center">{status.error}</p>}

              <button 
                type="submit" 
                disabled={status.loading}
                className="w-full group relative bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-6 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {status.loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <RocketLaunchIcon className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;