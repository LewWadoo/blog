import './Blog-post.scss';

import BlogPostHeader from '../blog-post-header';

function BlogPost({ title, favoritesCount, description, body, tagList, author, createdAt, slug }) {
  return <BlogPostHeader />;
}

export default BlogPost;
