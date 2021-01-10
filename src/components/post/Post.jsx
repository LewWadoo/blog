import { withRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import React, { useState, useEffect, useCallback } from 'react';
import { Alert, Spin } from 'antd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchArticle, deleteArticle } from '../../actions/articles';
import { CLEAR_REDIRECT, CLEAR_MESSAGE, CLEAR_ARTICLE } from '../../actions/action-types.js';
import { Redirect } from 'react-router-dom';

import './Post.scss';
import BlogPostHeader from '../blog-post-header';
import ButtonLink from '../button-link';
import Author from '../author';
import PopConfirm from '../pop-confirm';

function Post({ match, history }) {
  const slug = match ? match.params.slug : null;

  const article = useSelector((state) => state.article);
  const loading = useSelector((state) => state.loading);
  const message = useSelector((state) => state.message, shallowEqual);
  const auth = useSelector((state) => state.auth);
  const redirect = useSelector((state) => state.redirect);

  const dispatch = useDispatch();

  const getPost = useCallback(
    (slug) => {
      dispatch(fetchArticle(slug));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch({ type: CLEAR_REDIRECT });
    dispatch({ type: CLEAR_MESSAGE });
    dispatch({ type: CLEAR_ARTICLE });
    getPost(slug);
  }, [slug, getPost, dispatch]);

  const [showPopConfirm, setShowPopConfirm] = useState(false);

  const rejectDelete = () => {
    setShowPopConfirm(false);
  };

  const acceptDelete = () => {
    const { user } = auth;
    const { token } = user;
    setShowPopConfirm(false);
    dispatch(deleteArticle(token, slug));
  };

  const spin = loading ? <Spin /> : null;
  const popConfirm = showPopConfirm ? (
    <PopConfirm onAccept={acceptDelete} onReject={rejectDelete} />
  ) : null;

  let articleData = null;
  let articleBody = null;
  let authorData = null;
  let controlButtons = null;
  if (article && article.author && article.body && !loading && message === '') {
    const { author, createdAt } = article;
    articleData = <BlogPostHeader {...article} />;

    articleBody = <ReactMarkdown className="post-body">{article.body}</ReactMarkdown>;
    authorData = <Author author={author} createdAt={createdAt} />;
    if (
      article.author.username &&
      auth &&
      auth.user &&
      auth.user.username &&
      auth.user.username === article.author.username
    ) {
      controlButtons = (
        <div className="control-buttons">
          <ButtonLink
            label="Delete"
            classModification="error"
            sizeMod="sm"
            onClick={() => setShowPopConfirm(true)}
          />
          {popConfirm}
          <ButtonLink
            label="Edit"
            classModification="success"
            sizeMod="sm"
            link={`/articles/${slug}/edit`}
          />
        </div>
      );
    }
  }

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="post-container">
      <div className="header">
        <div className="article">
          {message && <Alert message={message} type="error" />}
          {spin}
          {articleData}
        </div>
        <div className="user-buttons">
          {authorData}
          {controlButtons}
        </div>
      </div>
      {articleBody}
    </div>
  );
}

export default withRouter(Post);
