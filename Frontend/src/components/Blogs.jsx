import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CalendarDaysIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const dummyPosts = [
  {
    id: 1,
    title: 'The Future of Web Development: Trends to Watch in 2026',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
    excerpt: 'From AI-powered code assistants to the rise of meta-frameworks, we explore the trends shaping the future of web development.',
    author: 'Khwaish Garg',
    date: 'October 1, 2025',
  },
  {
    id: 2,
    title: 'UI vs. UX: A Deep Dive into Designing for People',
    category: 'Design',
    imageUrl: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2072&auto=format&fit=crop',
    excerpt: 'Understand the critical differences and synergies between User Interface and User Experience to create products that users love.',
    author: 'Jane Doe',
    date: 'September 22, 2025',
  },
  {
    id: 3,
    title: 'How to Scale Your Application for High Traffic',
    category: 'Software Engineering',
    imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974&auto=format&fit=crop',
    excerpt: 'A technical guide to database optimization, load balancing, and caching strategies for a resilient and scalable architecture.',
    author: 'John Smith',
    date: 'September 15, 2025',
  },
];

const Blogs = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <div className="py-24 text-center bg-gradient-to-b from-gray-900 to-purple-900/20">
        <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text mb-4">
          Insights & Ideas
        </h1>
        <p className="text-xl text-gray-300">Our thoughts on technology, design, and innovation.</p>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {dummyPosts.map((post) => (
            <Link to="#" key={post.id} className="group block bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:scale-105">
              <div className="relative">
                <img className="w-full h-56 object-cover" src={post.imageUrl} alt={post.title} />
                <div className="absolute inset-0 bg-black/40"></div>
              </div>
              <div className="p-6">
                <p className="text-sm font-medium text-indigo-400 mb-2">{post.category}</p>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">{post.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-gray-500 text-xs">
                  <div className="flex items-center">
                    <UserCircleIcon className="w-4 h-4 mr-1.5" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarDaysIcon className="w-4 h-4 mr-1.5" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;