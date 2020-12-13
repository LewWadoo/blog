import { Alert, Spin, Pagination } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';

import './Blog-posts.scss';
import BlogPostHeader from '../blog-post-header';
import BlogService from '../../services/blogService';

function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [postsCount, setPostsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const blogService = new BlogService();
  const { fetchArticlesList } = blogService;
  const pageSize = 20;

  const getPosts = useCallback((page, size) => {
    fetchArticlesList(page, size)
      .then((result) => {
        setPosts(result.articles);
        setIsLoading(false);
        setPostsCount(result.articlesCount);
        return result;
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage(error.message);
      });
  }, []);

  useEffect(() => {
    getPosts(currentPage, pageSize);
    setIsLoading(true);
    // }, [currentPage, pageSize, getPosts]);
  }, [currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getPosts(currentPage, pageSize);
  };

  const alert = errorMessage ? <Alert message={errorMessage} type="error" /> : null;
  const spin = isLoading ? <Spin /> : null;

  const postsData =
    posts !== [] && !spin
      ? posts.map((article, index) => {
          return (
            <li key={article.slug} className="post-container">
              <BlogPostHeader {...article} />
            </li>
          );
        })
      : null;

  return (
    <div className="main">
      <ul className="blog-posts">
        {alert}
        {spin}
        {postsData}
      </ul>
      <Pagination
        className="pagination"
        current={currentPage}
        pageSize={pageSize}
        responsive
        onChange={handlePageChange}
        total={postsCount}
        showSizeChanger={false}
      />
    </div>
  );
}

export default BlogPosts;
