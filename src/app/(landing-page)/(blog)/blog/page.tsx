'use client'
import React, { useState } from 'react';
import { Search, Calendar, Clock, ChevronRight, User } from 'lucide-react';
import Navbar from '@/app/(landing-page)/navigation/navbar';
import Footer from '@/app/(landing-page)/navigation/footer';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Cybersecurity', 'Industry Insights', 'Company News', 'Tech Tips'];

  const blogPosts = [
    {
      id: 1,
      title: "The Rise of Insider Threats in 2024",
      excerpt: "Explore the growing concern of insider threats and learn strategies to mitigate risks within your organization.",
      category: "Cybersecurity",
      author: "Elena Kasparova",
      date: "May 15, 2024",
      readTime: "5 min read",
      image: "/api/placeholder/800/400"
    },
    {
      id: 2,
      title: "XThreat Launches New AI-Powered Threat Detection Tool",
      excerpt: "We're excited to announce our latest product that leverages artificial intelligence to identify and neutralize complex cyber threats.",
      category: "Company News",
      author: "Andrius Vaitkus",
      date: "April 28, 2024",
      readTime: "3 min read",
      image: "/api/placeholder/800/400"
    },
    {
      id: 3,
      title: "5 Essential Cybersecurity Practices for Remote Teams",
      excerpt: "With remote work becoming the norm, it's crucial to implement these security measures to protect your distributed workforce.",
      category: "Tech Tips",
      author: "Lina Johansson",
      date: "April 10, 2024",
      readTime: "7 min read",
      image: "/api/placeholder/800/400"
    },
    {
      id: 4,
      title: "The Impact of EU's NIS2 Directive on Cybersecurity Landscape",
      excerpt: "An in-depth analysis of how the new NIS2 Directive is shaping the future of cybersecurity in Europe and beyond.",
      category: "Industry Insights",
      author: "Marius Laurinavičius",
      date: "March 22, 2024",
      readTime: "10 min read",
      image: "/api/placeholder/800/400"
    },
  ];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] bg-gray-900 text-gray-100">
      <Navbar/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-52">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">XThreat Blog</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Stay informed about the latest cybersecurity trends, industry insights, and XThreat updates.
          </p>
          <div className="flex justify-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="bg-gray-800 text-white px-4 py-2 pl-10 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Blog Posts */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-400 mb-2">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs mr-2">{post.category}</span>
                  <User size={16} className="mr-1" />
                  <span className="mr-4">{post.author}</span>
                  <Calendar size={16} className="mr-1" />
                  <span className="mr-4">{post.date}</span>
                  <Clock size={16} className="mr-1" />
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-300 mb-4">{post.excerpt}</p>
                <a href={`/blog/${post.id}`} className="text-blue-400 hover:text-blue-300 flex items-center">
                  Read More <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
            </article>
          ))}
        </section>

        {/* Pagination */}
        <section className="mt-12 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700">Previous</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">1</button>
            <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700">2</button>
            <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700">3</button>
            <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700">Next</button>
          </nav>
        </section>
      </div>
      <Footer/>
    </div>
  );
};

export default BlogPage;