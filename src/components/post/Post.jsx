import { withRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import React, { useState, useEffect, useCallback } from 'react';
import { Alert, Spin } from 'antd';

import { BlogServiceConsumer } from '../blog-service-context';
import { SignedInUserConsumer } from '../signed-in-user-context';

import './Post.scss';
import BlogPostHeader from '../blog-post-header';
import BlogService from '../../services/blog-service';
import ButtonLink from '../button-link';
import User from '../user';
import PopConfirm from '../pop-confirm';

function Post({ match, history }) {
  const [slug, setSlug] = useState(match.params.slug);

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

  const [showPopConfirm, setShowPopConfirm] = useState(false);

  return (
    <BlogServiceConsumer>
      {({ createArticle, deleteArticle }) => (
        <SignedInUserConsumer>
          {({ user }) => {
            // eslint-disable-next-line no-console
            // console.log('in Post: user, post', user.username, post);

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
            let userData = null;
            let controlButtons = null;
            if (post && post !== {} && !spin && errorMessage === '') {
              postData = <BlogPostHeader {...post} />;
              postBody = <ReactMarkdown className="post-body">{post.body}</ReactMarkdown>;
              userData = <User {...post.author} />;
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
                    {userData}
                    {controlButtons}
                  </div>
                </div>
                {postBody}
              </div>
            );
          }}
        </SignedInUserConsumer>
      )}
    </BlogServiceConsumer>
  );
}

export default withRouter(Post);
