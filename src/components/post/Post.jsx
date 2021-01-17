import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import React, { useState, useEffect, useCallback } from 'react';
import { Alert, Spin } from 'antd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchArticle, deleteArticle } from '../../actions/articles';
import { CLEAR_MESSAGE } from '../../actions/action-types.js';

import './Post.scss';
import BlogPostHeader from '../blog-post-header';
import ButtonLink from '../button-link';
import Author from '../author';
import PopConfirm from '../pop-confirm';
import NewArticleForm from '../new-article-form';

function Post({ match }) {
  const slug = match ? match.params.slug : null;

  const article = useSelector((state) => state.article);
  const loading = useSelector((state) => state.loading);
  const message = useSelector((state) => state.message, shallowEqual);
  const { user } = useSelector((state) => state.auth);
  const redirect = useSelector((state) => state.redirect);

  const dispatch = useDispatch();

  const [doesOwnArticle, setOwnArticle] = useState(
    article && user && article.author.username === user.username,
  );

  const getPost = useCallback(
    (slug) => {
      dispatch(fetchArticle(slug));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch({ type: CLEAR_MESSAGE });
    setOwnArticle(article && user && article.author.username === user.username);
    if (slug && !article) {
      getPost(slug);
    }
  }, [slug, getPost, dispatch, article, user]);

  const [showPopConfirm, setShowPopConfirm] = useState(false);

  const rejectDelete = () => {
    setShowPopConfirm(false);
  };

  const acceptDelete = () => {
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
    if (doesOwnArticle) {
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
    <Switch>
      {/* <PrivateRoute */}
      {/*   path="/articles/:slug/edit" */}
      {/*   component={NewArticleForm} */}
      {/*   exact={true} */}
      {/*   redirect="/" */}
      {/*   condition={isLoggedIn && (doesOwnArticle || loading)} */}
      {/* /> */}
      <Route path="/articles/:slug/edit" exact={true} component={NewArticleForm} />
      <Route
        path="/articles/:slug"
        exact={true}
        render={() => (
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
        )}
      />
    </Switch>
  );
}

export default withRouter(Post);
