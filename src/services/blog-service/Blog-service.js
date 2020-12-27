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

    this.signUp = async (user) => {
      const registrationUrl = `users`;
      const fullUrl = `${this.baseUrl}${registrationUrl}`;

      const result = await fetch(`${fullUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!result.ok) {
        return result.json();
      }

      return result.json();
    };

    this.signIn = async (user) => {
      const authenticationUrl = `users/login`;
      const fullUrl = `${this.baseUrl}${authenticationUrl}`;

      const result = await fetch(`${fullUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!result.ok) {
        return result.json();
      }

      return result.json();
    };

    this.authorizeUser = async (token) => {
      const authorizationUrl = `user`;
      const fullUrl = `${this.baseUrl}${authorizationUrl}`;

      const result = await fetch(`${fullUrl}`, {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (!result.ok) {
        throw new Error(`Status: ${result.status}`);
      }

      return result.json();
    };

    this.updateUser = async (token, user) => {
      const authorizationUrl = `user`;
      const fullUrl = `${this.baseUrl}${authorizationUrl}`;

      const result = await fetch(`${fullUrl}`, {
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!result.ok) {
        throw new Error(`Status: ${result.status}`);
      }

      return result.json();
    };

    this.createArticle = async (token, article) => {
      const createArticleUrl = `articles`;
      const fullUrl = `${this.baseUrl}${createArticleUrl}`;

      const result = await fetch(`${fullUrl}`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
      });

      if (!result.ok) {
        throw new Error(`Status: ${result.status}`);
      }

      return result.json();
    };

    this.updateArticle = async (token, article, slug) => {
      const updateArticleUrl = `articles/${slug}`;
      const fullUrl = `${this.baseUrl}${updateArticleUrl}`;

      const request = {
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
      };

      const result = await fetch(`${fullUrl}`, request);

      if (!result.ok) {
        throw new Error(`Status: ${result.status}`);
      }

      return result.json();
    };

    this.deleteArticle = async (token, slug) => {
      const deleteArticleUrl = `articles/${slug}`;
      const fullUrl = `${this.baseUrl}${deleteArticleUrl}`;
      const request = {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      const result = await fetch(`${fullUrl}`, request);

      if (result.ok) {
        return true;
      }

      return false;
    };

    this.favoriteArticle = async (token, slug) => {
      const favoriteArticleUrl = `articles/${slug}/favorite`;
      const fullUrl = `${this.baseUrl}${favoriteArticleUrl}`;
      const request = {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      const result = await fetch(`${fullUrl}`, request);

      if (result.ok) {
        return true;
      }

      return false;
    };

    this.unfavoriteArticle = async (token, slug) => {
      const favoriteArticleUrl = `articles/${slug}/favorite`;
      const fullUrl = `${this.baseUrl}${favoriteArticleUrl}`;
      const request = {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      const result = await fetch(`${fullUrl}`, request);

      if (result.ok) {
        return true;
      }

      return false;
    };
  }
}
