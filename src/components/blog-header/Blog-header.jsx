import { Link } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';

import './Blog-header.scss';
import User from '../user';
import ButtonLink from '../button-link';
import * as actions from '../../actions/auth';
import { getAuth } from '../../reducers';

function BlogHeader({ auth }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(actions.logout());
  };

  const headerLinks = !isLoggedIn ? (
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
        <User {...auth.user} />
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

const mapStateToProps = (state) => {
  return {
    auth: getAuth(state),
  };
};

export default connect(mapStateToProps, actions)(BlogHeader);
