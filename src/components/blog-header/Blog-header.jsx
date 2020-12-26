import { Link } from 'react-router-dom';

import './Blog-header.scss';
import User from '../user';
import { SignedInUserConsumer } from '../signed-in-user-context';
import ButtonLink from '../button-link';

function BlogHeader() {
  return (
    <SignedInUserConsumer>
      {({ user, setUser }) => {
        const logOut = () => {
          window.localStorage.setItem('user', '');
          setUser('');
        };
        // eslint-disable-next-line no-console
        console.log('in BlogHeader: user', user);
        // eslint-disable-next-line no-console
        // console.log('in BlogHeader: user', user);
        const headerLinks = !user ? (
          <div className="user">
            <ButtonLink
              link="/sign-in"
              sizeMod="md"
              classModification="text"
              className="link"
              label="Sign In"
              border={false}
            />
            <ButtonLink
              link="/sign-up"
              sizeMod="md"
              classModification="success"
              className="link"
              label="Sign Up"
            />
            {/* <Link to="/sign-up" className="link link-register"> */}
            {/*   Sign Up */}
            {/* </Link> */}
          </div>
        ) : (
          <div className="user">
            <Link to="/new-article" className="link link-new-article">
              Create article
            </Link>
            <Link to="/profile" className="link link-user">
              <User {...user} />
            </Link>
            <ButtonLink
              sizeMod="md"
              classModification="text"
              className="link"
              label="Log Out"
              onClick={logOut}
            />
            {/* <button className="link link-logout" onClick={logOut}> */}

            {/* </button> */}
          </div>
        );

        return (
          <header className="blog-header">
            <Link to="/" className="link link-root">
              Realworld Blog
            </Link>
            {headerLinks}
          </header>
        );
      }}
    </SignedInUserConsumer>
  );
}

export default BlogHeader;
