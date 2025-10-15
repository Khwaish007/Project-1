import React from 'react';
import { 
  UsersIcon, 
  LightBulbIcon, 
  HeartIcon, 
  RocketLaunchIcon,
  SparklesIcon,
  ScaleIcon
} from '@heroicons/react/24/outline';

const teamMembers = [
  { name: 'Khwaish Garg', role: 'Founder & CEO', imageUrl: 'https://via.placeholder.com/150' },
  { name: 'Jane Doe', role: 'Lead Developer', imageUrl: 'https://via.placeholder.com/150' },
  { name: 'John Smith', role: 'UI/UX Designer', imageUrl: 'https://via.placeholder.com/150' },
];

const values = [
  { icon: LightBulbIcon, title: 'Innovation', description: 'We constantly push the boundaries of technology to deliver cutting-edge solutions.' },
  { icon: HeartIcon, title: 'Passion', description: 'We are passionate about our craft and dedicated to our clients\' success.' },
  { icon: ScaleIcon, title: 'Integrity', description: 'We believe in transparency and honesty in all our interactions.' },
];

const AboutUs = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative text-center py-24 px-4 bg-gradient-to-b from-gray-900 to-purple-900/20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-white/10 rounded-full animate-ping" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${3 + Math.random() * 2}s` }} />
          ))}
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text mb-6">
            Architects of the Digital Future
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We are a collective of creators, thinkers, and innovators dedicated to building extraordinary digital experiences.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50">
            <h2 className="text-3xl font-bold text-white mb-4">Our Story</h2>
            <p className="text-gray-400 leading-relaxed">
              Founded in 2023, our journey began with a simple yet powerful idea: to merge creativity with technology to solve complex problems. We saw a future where digital solutions were not just functional, but also beautiful and intuitive. Today, we are a thriving team that has delivered over 50 projects, helping businesses transform their digital presence and achieve their goals.
            </p>
          </div>
          <div className="relative h-64">
            <div className="absolute top-0 left-0 w-full h-full bg-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
            <UsersIcon className="absolute inset-0 w-32 h-32 m-auto text-purple-400" />
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-400">The principles that guide our work and culture.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50 text-center hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
                <value.icon className="w-12 h-12 text-blue-400 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-2xl font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Meet the Team</h2>
            <p className="text-lg text-gray-400">The brilliant minds behind our success.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-800/50 rounded-2xl p-6 text-center border border-gray-700/50">
                <img className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-700" src={member.imageUrl} alt={member.name} />
                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                <p className="text-indigo-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;