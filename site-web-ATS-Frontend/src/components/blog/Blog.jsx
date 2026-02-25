import React, { useState, useEffect } from 'react'
import apiService from '../Services/apiService'
import './blog.css'

const Blog = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const data = await apiService.getArticles()
      setArticles(Array.isArray(data) ? data : data.results || [])
      setError(null)
    } catch (err) {
      setError(err.detail || 'Failed to load articles')
      console.error('Error fetching articles:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter(article => article.category === selectedCategory)

  const categories = ['all', ...new Set(articles.map(article => article.category).filter(Boolean))]

  if (loading) {
    return <div className="blog-loading">Loading articles...</div>
  }

  if (error) {
    return <div className="blog-error">Error: {error}</div>
  }

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1>Our Blog</h1>
        <p>Stay updated with our latest articles and insights</p>
      </div>

      {articles.length > 0 && (
        <div className="blog-filters">
          <h3>Filter by Category:</h3>
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="blog-grid">
        {filteredArticles.length > 0 ? (
          filteredArticles.map(article => (
            <article key={article.id} className="blog-card">
              {article.image && (
                <div className="blog-card-image">
                  <img src={article.image} alt={article.title} />
                </div>
              )}
              <div className="blog-card-content">
                <div className="blog-meta">
                  {article.category && (
                    <span className="blog-category">{article.category}</span>
                  )}
                  {article.date && (
                    <span className="blog-date">
                      {new Date(article.date).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <h2 className="blog-title">{article.title}</h2>
                <p className="blog-excerpt">
                  {article.excerpt || article.content?.substring(0, 150)}
                </p>
                {article.author && (
                  <p className="blog-author">By {typeof article.author === 'object' ? article.author.username : article.author}</p>
                )}
                <a href={`#article/${article.id}`} className="read-more">
                  Read More →
                </a>
              </div>
            </article>
          ))
        ) : (
          <div className="no-articles">
            <p>No articles found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog