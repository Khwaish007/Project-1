import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CalendarDaysIcon, UserCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const BlogPost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5001/api/blogs/${slug}`);
        setPost(response.data);
      } catch (error) {
        console.error("Failed to fetch post", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading post...</div>;
  }

  if (!post) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Post not found.</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8">
          <ArrowLeftIcon className="w-5 h-5" />
          Back to all posts
        </Link>
        
        <article>
          <header className="mb-12 text-center">
            <p className="text-indigo-400 font-semibold mb-2">{post.category}</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{post.title}</h1>
            <div className="flex items-center justify-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <UserCircleIcon className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDaysIcon className="w-5 h-5" />
                <time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString()}</time>
              </div>
            </div>
          </header>

          <figure className="mb-12">
            <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-2xl" />
          </figure>

          <div 
            className="prose prose-invert lg:prose-xl max-w-none mx-auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default BlogPost;