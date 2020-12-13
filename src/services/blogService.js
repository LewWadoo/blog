export default class BlogService {
  constructor(props) {
    this.baseUrl = `https://conduit.productionready.io/api/`;

    this.getResource = async (url) => {
      const result = await fetch(`${url}`);

      if (!result.ok) {
        throw new Error(`Status: ${result.status}`);
      }

      return result.json();
    };

    this.fetchArticle = async (slug) => {
      const articleUrl = `articles/${slug}`;
      const fullUrl = `${this.baseUrl}${articleUrl}`;
      return this.getResource(`${fullUrl}`);
    };

    this.fetchArticlesList = async (page = 1, limit = 20) => {
      const articlesUrl = `articles`;
      const offset = (page - 1) * limit;
      const fullUrl = `${this.baseUrl}${articlesUrl}?offset=${offset}&limit=${limit}`;
      return this.getResource(`${fullUrl}`);
    };
  }
}
