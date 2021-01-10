import { Alert, Spin, Pagination } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';

import './Blog-posts.scss';
import BlogPostHeader from '../blog-post-header';
import { getArticles, getLoading } from '../../reducers';
import * as actions from '../../actions/articles';
import {
  CLEAR_REDIRECT,
  CLEAR_ARTICLE,
  CLEAR_MESSAGE,
  CLEAR_ERRORS,
} from '../../actions/action-types.js';

import Author from '../author';

const BlogPosts = ({ articles, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const message = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const PAGE_SIZE = 20;

  const getArticles = useCallback(
    (page, size) => {
      dispatch(actions.fetchArticlesList(page, size));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch({ type: CLEAR_MESSAGE });
    dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: CLEAR_REDIRECT });
    dispatch({ type: CLEAR_ARTICLE });
    getArticles(currentPage, PAGE_SIZE);
  }, [currentPage, PAGE_SIZE, getArticles, dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getArticles(page, PAGE_SIZE);
  };

  const alert = message ? <Alert message={message} type="error" /> : null;
  const spin = loading ? <Spin /> : null;

  const articlesData =
    articles && articles.articles && articles.articles !== [] && !spin
      ? articles.articles.map((article, index) => {
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
        {articlesData}
      </ul>
      <Pagination
        current={currentPage}
        pageSize={PAGE_SIZE}
        responsive
        onChange={handlePageChange}
        total={articles.articlesCount}
        showSizeChanger={false}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: getArticles(state),
    loading: getLoading(state),
  };
};

export default connect(mapStateToProps, actions)(BlogPosts);
