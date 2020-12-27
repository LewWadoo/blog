import { Alert, Spin, Pagination } from 'antd';
import React, { useState, useEffect, useCallback, useContext } from 'react';

import './Blog-posts.scss';
import BlogPostHeader from '../blog-post-header';
import { BlogServiceContext } from '../blog-service-context';

import Author from '../author';

function BlogPosts() {
  const blogServiceContext = useContext(BlogServiceContext);
  const { fetchArticlesList } = blogServiceContext;

  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [postsCount, setPostsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const PAGE_SIZE = 5;

  const getPosts = useCallback(
    (page, size) => {
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
    },
    [fetchArticlesList],
  );

  useEffect(() => {
    getPosts(currentPage, PAGE_SIZE);
    setIsLoading(true);
  }, [currentPage, PAGE_SIZE, getPosts]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getPosts(page, PAGE_SIZE);
  };

  const alert = errorMessage ? <Alert message={errorMessage} type="error" /> : null;
  const spin = isLoading ? <Spin /> : null;

  const postsData =
    posts !== [] && !spin
      ? posts.map((article, index) => {
          const { author, createdAt } = article;
          return (
            <li key={article.slug} className="post-container">
              <div className="header">
                <div className="article">
                  <BlogPostHeader {...article} />
                </div>
                <Author author={author} createdAt={createdAt} />
              </div>
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
        current={currentPage}
        pageSize={PAGE_SIZE}
        responsive
        onChange={handlePageChange}
        total={postsCount}
        showSizeChanger={false}
      />
    </div>
  );
}

export default BlogPosts;
