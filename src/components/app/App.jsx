import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';
import 'antd/dist/antd.css';

import BlogHeader from '../blog-header';
import BlogPosts from '../blog-posts';
import Post from '../post';
import SignUpForm from '../sign-up-form';
import SignInForm from '../sign-in-form';
import Profile from '../profile';
import NewArticleForm from '../new-article-form';
import PrivateRoute from '../private-route';
import { authorize } from '../../actions/auth';

function App() {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const article = useSelector((state) => state.article);

  const dispatch = useDispatch();

  const doesOwnArticle = article && user && article.author.username === user.username;

  useEffect(() => {
    const userData = window.localStorage.getItem('user') ? window.localStorage.getItem('user') : '';
    if (userData === '') {
      return;
    }

    const userJson = JSON.parse(userData);
    const { token } = userJson;

    dispatch(authorize(token));
  }, [dispatch]);

  return (
    <div className="app">
      <BrowserRouter>
        <BlogHeader />
        <Switch>
          <Route path="/sign-up" component={SignUpForm} />
          <Route path="/sign-in" component={SignInForm} />
          <PrivateRoute
            path="/articles/:slug/edit"
            component={NewArticleForm}
            redirect="/new-article"
            condition={isLoggedIn && doesOwnArticle}
          />
          <Route path="/articles/:slug" component={Post} />
          <Route path="/articles" exact component={BlogPosts} />
          <PrivateRoute
            path="/profile"
            exact={true}
            component={Profile}
            redirect="/sign-in"
            condition={user}
          />
          <PrivateRoute
            path="/new-article"
            exact
            component={NewArticleForm}
            redirect="/sign-in"
            condition={user}
          />
          <Route path="/" exact component={BlogPosts} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
