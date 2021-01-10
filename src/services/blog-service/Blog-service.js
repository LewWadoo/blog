import authHeader from '../auth-service/Auth-header';

const baseUrl = `https://conduit.productionready.io/api/`;
export default class BlogService {
  constructor(props) {
    this.fetchArticle = async (slug) => {
      const articleUrl = `articles/${slug}`;
      const fullUrl = `${baseUrl}${articleUrl}`;
      return fetch(`${fullUrl}`);
    };

    this.fetchArticlesList = async (page = 1, limit = 20) => {
      const articlesUrl = `articles`;
      const offset = (page - 1) * limit;
      const fullUrl = `${baseUrl}${articlesUrl}?offset=${offset}&limit=${limit}`;
      return fetch(`${fullUrl}`);
    };

    this.createArticle = (token, title, description, body, tagList = []) => {
      console.log(JSON.stringify({ article: { title, description, body, tagList } }));
      return fetch(`${baseUrl}articles`, {
        method: 'POST',
        headers: { ...authHeader(token), 'Content-Type': 'application/json' },
        body: JSON.stringify({ article: { title, description, body, tagList } }),
      });
    };

    this.updateArticle = (
      token,
      title = null,
      description = null,
      body = null,
      tagList = null,
      slug,
    ) => {
      return fetch(`${baseUrl}articles/${slug}`, {
        method: 'PUT',
        headers: { ...authHeader(token), 'Content-Type': 'application/json' },
        body: JSON.stringify({ article: { title, description, body, tagList } }),
      });
    };

    this.deleteArticle = (token, slug) => {
      return fetch(`${baseUrl}articles/${slug}`, { method: 'DELETE', headers: authHeader(token) });
    };

    this.favoriteArticle = (token, slug) => {
      console.log('in Blog-service favoriteArticle: slug', slug);
      return fetch(`${baseUrl}articles/${slug}/favorite`, {
        method: 'POST',
        headers: authHeader(token),
      });
    };

    this.unfavoriteArticle = (token, slug) => {
      return fetch(`${baseUrl}articles/${slug}/favorite`, {
        method: 'DELETE',
        headers: authHeader(token),
      });
    };
  }
}
