import './User.scss';

function User({ image, username }) {
  return (
    <div className="user">
      <div className="info">
        <div className="name">{username}</div>
      </div>
      <img alt="user" src={image} className="picture"></img>
    </div>
  );
}

export default User;
