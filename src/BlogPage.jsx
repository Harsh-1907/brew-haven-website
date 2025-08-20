import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock } from 'lucide-react';
import { AnimatedSection, AnimatedButton, BlogCard } from './commonComponents.jsx';
import { blogPosts } from './App.jsx';

const BlogPage = ({ onPageChange, setArticleId }) => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const categories = ['All', 'Coffee Guide', 'Brewing Tips', 'Origin Stories', 'Recipes', 'News'];
  const featuredPosts = blogPosts.filter(post => post.tags.includes('Featured'));
  const allPosts = blogPosts.filter(post =>
    (filter === 'All' || post.category === filter) &&
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSubscribe = () => {
    alert("Thank you for subscribing to our newsletter!");
  };
  return (
    <main className="bg-white">
      <div className="container mx-auto py-24 px-4">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">Coffee Stories</h2>
          <p className="text-lg text-gray-600">Discover the world of coffee through expert insights, brewing guides, and fascinating origin stories</p>
        </AnimatedSection>
        <AnimatedSection className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-auto flex-grow">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map(category => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 text-sm ${
                    filter === category ? 'bg-orange-600 text-white shadow-md' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {featuredPosts.map(post => (
                    <BlogCard
                        key={post.id}
                        post={post}
                        isFeatured={true}
                        onReadMore={() => {
                            setArticleId(post.id);
                            onPageChange('article');
                        }}
                    />
                ))}
            </div>
        </AnimatedSection>
        <AnimatedSection>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">All Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {allPosts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <BlogCard
                    post={post}
                    isFeatured={false}
                    onReadMore={() => {
                      setArticleId(post.id);
                      onPageChange('article');
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </AnimatedSection>
      </div>
      <section className="bg-[#222] text-white py-16 px-4 text-center">
          <div className="container mx-auto">
              <h2 className="text-4xl font-extrabold mb-2">Stay Updated with Coffee Insights</h2>
              <p className="text-lg text-white mb-8">Subscribe to our newsletter for the latest brewing tips, origin stories, and coffee news</p>
              <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto" onSubmit={(e) => { e.preventDefault(); handleSubscribe(); }}>
                  <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white border-2 border-black"/>
                  <AnimatedButton type="submit" className="w-full sm:w-auto rounded-lg bg-orange-500 text-white border-2 border-black hover:bg-orange-300 hover:text-black px-5 py-3 font-semibold transition-colors duration-300">
                      Subscribe
                  </AnimatedButton>
              </form>
          </div>
      </section>
    </main>
  );
};
export default BlogPage;