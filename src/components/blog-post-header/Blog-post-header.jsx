import { Link } from 'react-router-dom';

import './Blog-post-header.scss';
import Tag from '../tag';

function BlogPostHeader({
  title,
  favoritesCount,
  description,
  body,
  tagList,
  author,
  createdAt,
  slug,
}) {
  return (
    <div className="blog-post-header">
      <div className="article">
        <div className="title-container">
          <Link to={`/articles/${slug}`}>
            <div className="blog-post-title">{title}</div>
          </Link>
          <div className="blog-likes">
            <input type="button" className="btn-heart" disabled />
            <span className="likes-count">{favoritesCount}</span>
          </div>
        </div>
        <div className="blog-tags">
          {tagList ? tagList.map((tag, index) => <Tag tag={tag} key={index} />) : null}
        </div>
        <p className="blog-post-content">{description}</p>
      </div>
    </div>
  );
}

export default BlogPostHeader;
