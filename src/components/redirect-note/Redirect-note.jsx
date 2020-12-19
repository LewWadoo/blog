import { Link } from 'react-router-dom';

import './Redirect-note.scss';

function RedirectNote({ note, linkText, linkReference }) {
  return (
    <p className="redirect-note">
      {note}
      <Link to={linkReference}>{linkText}.</Link>
    </p>
  );
}

export default RedirectNote;
