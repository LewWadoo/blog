import authHeader from '../auth-service/Auth-header';

const baseUrl = `https://conduit.productionready.io/api/`;

export default class AuthService {
  constructor(props) {
    this.signUp = (username, email, password) => {
      const fullUrl = `${baseUrl}users`;

      return fetch(`${fullUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: { username, email, password } }),
      });
    };

    this.signIn = (email, password) => {
      const fullUrl = `${baseUrl}users/login`;
      console.log('in signIn: email', email);
      return fetch(`${fullUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: { email, password } }),
      });
    };

    this.logout = () => {
      window.localStorage.removeItem('user');
    };

    this.authorize = async (token) => {
      const authorizationUrl = `user`;
      const fullUrl = `${baseUrl}${authorizationUrl}`;

      return fetch(`${fullUrl}`, { headers: authHeader(token) });
    };

    this.updateUser = (token, image, username = '', email = '', password = '') => {
      console.log(
        'in AuthService updateUser: image, username, email, password',
        image,
        username,
        email,
        password,
      );
      const updatedUser = {};
      updatedUser.image = image;
      if (username) {
        updatedUser.username = username;
      }
      if (email) {
        updatedUser.email = email;
      }
      if (password) {
        updatedUser.password = password;
      }
      console.log('in AuthService: updatedUser', updatedUser);

      return fetch(`${baseUrl}user`, {
        method: 'PUT',
        headers: { ...authHeader(token), 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: updatedUser }),
      });
    };
  }
}
