import { withRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Alert, Spin } from 'antd';

import { BlogServiceContext } from '../blog-service-context';
import { SignedInUserContext } from '../signed-in-user-context';

import './Post.scss';
import BlogPostHeader from '../blog-post-header';
import ButtonLink from '../button-link';
import Author from '../author';
import PopConfirm from '../pop-confirm';

function Post({ match, history }) {
  const blogServiceContext = useContext(BlogServiceContext);
  const { fetchArticle, deleteArticle } = blogServiceContext;
  const signedInUserContext = useContext(SignedInUserContext);
  const { user } = signedInUserContext;

  const [slug, setSlug] = useState(match.params.slug);

  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getPost = useCallback(
    (slug) => {
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
    },
    [fetchArticle],
  );

  useEffect(() => {
    getPost(slug);
    setIsLoading(true);
  }, [slug, getPost]);

  const [showPopConfirm, setShowPopConfirm] = useState(false);

  const rejectDelete = () => {
    setShowPopConfirm(false);
  };

  const acceptDelete = () => {
    setShowPopConfirm(false);
    const { token } = user;
    const isDeleted = deleteArticle(token, slug);
    if (isDeleted) {
      setSlug('');
    }
  };

  const alert = errorMessage ? <Alert message={errorMessage} type="error" /> : null;
  const spin = isLoading ? <Spin /> : null;
  const popConfirm = showPopConfirm ? (
    <PopConfirm onAccept={acceptDelete} onReject={rejectDelete} />
  ) : null;

  let postData = null;
  let postBody = null;
  let authorData = null;
  let controlButtons = null;
  if (post && post.author && !spin && errorMessage === '') {
    const { author, createdAt } = post;
    postData = <BlogPostHeader {...post} />;
    postBody = <ReactMarkdown className="post-body">{post.body}</ReactMarkdown>;
    authorData = <Author author={author} createdAt={createdAt} />;
    if (
      post.author &&
      post.author.username &&
      user &&
      user.username &&
      user.username === post.author.username
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

  return (
    <div className="post-container">
      <div className="header">
        <div className="article">
          {alert}
          {spin}
          {postData}
        </div>
        <div className="user-buttons">
          {authorData}
          {controlButtons}
        </div>
      </div>
      {postBody}
    </div>
  );
}

export default withRouter(Post);
