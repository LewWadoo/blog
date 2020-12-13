import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.scss';
import 'antd/dist/antd.css';

import BlogHeader from '../blog-header';
import BlogPosts from '../blog-posts';
import Post from '../post';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <BlogHeader />
        <Switch>
          <Route path="/articles/:slug" component={Post} />
          <Route path="/articles" exact component={BlogPosts} />
          <Route path="/" exact component={BlogPosts} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
