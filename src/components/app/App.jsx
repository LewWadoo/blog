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

import { BlogServiceProvider } from '../blog-service-context';
import { SignedInUserProvider } from '../signed-in-user-context';

const blogService = new BlogService();

function App() {
  const [user, setUser] = useState('');

  useEffect(() => {
    // const UserContext = createContext(user);
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
    <BlogServiceProvider value={blogService}>
      <SignedInUserProvider value={{ user, setUser }}>
        <div className="app">
          <BrowserRouter>
            <BlogHeader />
            <Switch>
              <Route path="/sign-up" component={SignUpForm} />
              <Route path="/sign-in" component={SignInForm} />
              <Route path="/articles/:slug" component={Post} />
              <Route path="/articles" exact component={BlogPosts} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/" exact component={BlogPosts} />
            </Switch>
          </BrowserRouter>
        </div>
      </SignedInUserProvider>
    </BlogServiceProvider>
  );
}

export default App;
