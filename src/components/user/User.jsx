import './User.scss';
import { format } from 'date-fns';

function User({ image, username, createdAt }) {
  // eslint-disable-next-line no-console
  // console.log('in User: image, username', image, username);
  const formattedDate = (date) => {
    try {
      const dateObject = new Date(createdAt);
      return format(dateObject, 'MMMM d, yyyy');
    } catch (error) {
      return '';
    }
  };

  return (
    <div className="user">
      <div className="info">
        <div className="name">{username}</div>
        <div className="date">{formattedDate(createdAt)}</div>
      </div>
      <img alt="userpic" src={image} className="picture"></img>
    </div>
  );
}

export default User;
