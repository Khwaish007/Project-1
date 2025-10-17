import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CalendarDaysIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5001/api/blogs');
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

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
        {loading ? (
          <div className="text-center text-white">Loading posts...</div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link to={`/blog/${post.slug}`} key={post._id} className="group block bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:scale-105">
                <div className="relative">
                  <img className="w-full h-56 object-cover" src={post.imageUrl} alt={post.title} />
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <div className="p-6">
                  <p className="text-sm font-medium text-indigo-400 mb-2">{post.category}</p>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">{post.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-gray-500 text-xs mt-auto">
                    <div className="flex items-center">
                      <UserCircleIcon className="w-4 h-4 mr-1.5" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarDaysIcon className="w-4 h-4 mr-1.5" />
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;