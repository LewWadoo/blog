import { Link } from 'react-router-dom';

import './Blog-header.scss';

function BlogHeader() {
  return (
    <header className="blog-header">
      <Link to="/" className="link link-root">
        Realworld Blog
      </Link>
      <Link to="/login" className="link">
        Sign In
      </Link>
      <Link to="/register" className="link link-register">
        Sign Up
      </Link>
    </header>
  );
}

export default BlogHeader;
