import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.scss';
import 'antd/dist/antd.css';

import BlogHeader from '../blog-header';
import BlogPosts from '../blog-posts';
import Post from '../post';
import SignUpForm from '../sign-up-form';
import SignInForm from '../sign-in-form';
import BlogService from '../../services/blog-service';
import Profile from '../profile';
import NewArticleForm from '../new-article-form';
import PrivateRoute from '../private-route';

import { BlogServiceContext } from '../blog-service-context';
import { SignedInUserContext } from '../signed-in-user-context';

const blogService = new BlogService();

function App() {
  const [user, setUser] = useState('');

  useEffect(() => {
    const userData = window.localStorage.getItem('user') ? window.localStorage.getItem('user') : '';
    if (userData === '') {
      return;
    }

    const userJson = JSON.parse(userData);
    const { token } = userJson;

    const authorize = async (token) => {
      const result = await blogService.authorizeUser(token);
      setUser(result.user);
    };

    authorize(token);
  }, []);

  return (
    <BlogServiceContext.Provider value={blogService}>
      <SignedInUserContext.Provider value={{ user, setUser }}>
        <div className="app">
          <BrowserRouter>
            <BlogHeader />
            <Switch>
              <Route path="/sign-up" component={SignUpForm} />
              <Route path="/sign-in" component={SignInForm} />
              <PrivateRoute
                path="/articles/:slug/edit"
                component={NewArticleForm}
                redirect="/sign-in"
                condition={user}
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
      </SignedInUserContext.Provider>
    </BlogServiceContext.Provider>
  );
}

export default App;
