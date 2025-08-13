import React from 'react';
import { AnimatedSection, AnimatedButton } from './commonComponents.jsx';
import { blogPosts } from './App.jsx';

const ArticlePage = ({ articleId, onPageChange }) => {
  const article = blogPosts.find(p => p.id === articleId);
  if (!article) {
    return (
      <div className="container mx-auto py-24 px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900">Article not found.</h2>
        <AnimatedButton onClick={() => onPageChange('blog')} className="bg-orange-600 text-white mt-8">
          Back to Blog
        </AnimatedButton>
      </div>
    );
  }
  return (
    <main className="container mx-auto py-24 px-4 max-w-4xl">
      <AnimatedSection>
        <AnimatedButton onClick={() => onPageChange('blog')} className="bg-gray-200 text-gray-800 text-base mb-8">
          ← Back to Blog
        </AnimatedButton>
        <img src={article.image} alt={article.title} className="w-full rounded-3xl object-cover h-96 mb-8 shadow-xl"/>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{article.title}</h1>
        <p className="text-gray-500 mb-8">By {article.author} on {article.date}</p>
        <div className="prose lg:prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: article.content }}></div>
      </AnimatedSection>
    </main>
  );
};
export default ArticlePage;