import { Link } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';

import './Blog-post-header.scss';

import Tag from '../tag';
import ButtonFavorite from '../button-favorite';
import { getArticles, getAuth } from '../../reducers';
import * as actions from '../../actions/articles';

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
  auth,
}) {
  const dispatch = useDispatch();

  const like = () => {
    const { token } = auth.user;
    if (favorited) {
      dispatch(actions.unfavoriteArticle(token, slug));
    } else {
      dispatch(actions.favoriteArticle(token, slug));
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
            <ButtonFavorite disabled={!auth.user} onClick={like} isFavorited={favorited} />
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

const mapStateToProps = (state) => {
  return {
    articles: getArticles(state),
    auth: getAuth(state),
  };
};

export default connect(mapStateToProps, actions)(BlogPostHeader);
