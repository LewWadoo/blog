import './User.scss';
import userpic from './avatar.svg';

function User({ image, username }) {
  let avatar = image;
  if (!avatar) {
    avatar = userpic;
  }
  return (
    <div className="user">
      <div className="info">
        <div className="name">{username}</div>
      </div>
      <img alt="user" src={avatar} className="picture"></img>
    </div>
  );
}

export default User;
