import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';

import './Blog-post-header.scss';

import Tag from '../tag';
import { SignedInUserContext } from '../signed-in-user-context';
import { BlogServiceContext } from '../blog-service-context';
import ButtonFavorite from '../button-favorite';

function BlogPostHeader({
  title,
  favoritesCount,
  description,
  body,
  tagList,
  author,
  createdAt,
  slug,
  favorited,
}) {
  const signedInUserContext = useContext(SignedInUserContext);
  const { user } = signedInUserContext;
  const blogServiceContext = useContext(BlogServiceContext);
  const { favoriteArticle, unfavoriteArticle } = blogServiceContext;

  const [isFavorited, setFavorited] = useState(favorited);
  const [favorites, setFavorites] = useState(favoritesCount);

  const like = async () => {
    const { token } = user;
    if (isFavorited) {
      const isSuccessfullyUnfavorited = await unfavoriteArticle(token, slug);
      if (isSuccessfullyUnfavorited) {
        setFavorited(false);
        setFavorites(favorites - 1);
      }
    } else {
      const isSuccessfullyFavorited = await favoriteArticle(token, slug);
      if (isSuccessfullyFavorited) {
        setFavorited(true);
        setFavorites(favorites + 1);
      }
    }
  };

  return (
    <div className="blog-post-header">
      <div className="article">
        <div className="title-container">
          <Link to={`/articles/${slug}`}>
            <div className="blog-post-title">{title}</div>
          </Link>
          <div className="blog-likes">
            <ButtonFavorite disabled={!user} onClick={like} isFavorited={isFavorited} />
            <span className="likes-count">{favorites}</span>
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
