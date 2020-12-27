import './Author.scss';
import { format } from 'date-fns';

function Author({ author, createdAt }) {
  const { username, image } = author;

  const formattedDate = (date) => {
    try {
      const dateObject = new Date(createdAt);
      return format(dateObject, 'MMMM d, yyyy');
    } catch (error) {
      return '';
    }
  };

  return (
    <div className="author">
      <div className="info">
        <div className="name">{username}</div>
        <div className="date">{formattedDate(createdAt)}</div>
      </div>
      <img alt="author" src={image} className="picture"></img>
    </div>
  );
}

export default Author;
