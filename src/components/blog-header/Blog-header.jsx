import { Link } from 'react-router-dom';
import { useContext } from 'react';

import './Blog-header.scss';
import User from '../user';
import { SignedInUserContext } from '../signed-in-user-context';
import ButtonLink from '../button-link';

function BlogHeader() {
  const signedInUserContext = useContext(SignedInUserContext);
  const { user, setUser } = signedInUserContext;

  const logOut = () => {
    window.localStorage.setItem('user', '');
    setUser('');
  };

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
    </div>
  ) : (
    <div className="user">
      <ButtonLink
        label="Create article"
        link="/new-article"
        classModification="success"
        sizeMod="sm"
      />
      <Link to="/profile" className="link">
        <User {...user} />
      </Link>
      <ButtonLink sizeMod="md" classModification="text" label="Log Out" onClick={logOut} />
    </div>
  );

  return (
    <header className="blog-header">
      <ButtonLink
        link="/"
        label="Realworld Blog"
        classModification="heading"
        border={false}
        sizeMod="md"
      />
      {headerLinks}
    </header>
  );
}

export default BlogHeader;
