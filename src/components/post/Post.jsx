import { withRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import React, { useState, useEffect, useCallback } from 'react';
import { Alert, Spin } from 'antd';

import './Post.scss';
import BlogPostHeader from '../blog-post-header';
import BlogService from '../../services/blogService';

function Post({ match, history }) {
  const slug = match.params.slug;

  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const blogService = new BlogService();
  const { fetchArticle } = blogService;

  const getPost = useCallback((slug) => {
    fetchArticle(slug)
      .then((result) => {
        setPost(result.article);
        setIsLoading(false);
        return result;
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage(error.message);
      });
    // }, [fetchArticle]);
  }, []);

  useEffect(() => {
    getPost(slug);
    setIsLoading(true);
    // }, [slug, getPost]);
  }, [slug]);

  const alert = errorMessage ? <Alert message={errorMessage} type="error" /> : null;
  const spin = isLoading ? <Spin /> : null;

  const postData =
    post !== {} && !spin && errorMessage === '' ? <BlogPostHeader {...post} /> : null;

  return (
    <div className="main">
      <div className="post-container">
        {alert}
        {spin}
        {postData}
        <ReactMarkdown className="post-body">{post.body}</ReactMarkdown>
      </div>
    </div>
  );
}

export default withRouter(Post);
