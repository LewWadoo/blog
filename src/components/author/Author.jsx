import './Author.scss';
import { format } from 'date-fns';

function Author({ image, authorname, createdAt }) {
  // eslint-disable-next-line no-console
  // console.log('in Author: image, authorname', image, authorname);
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
        <div className="name">{authorname}</div>
        <div className="date">{formattedDate(createdAt)}</div>
      </div>
      <img alt="authorpic" src={image} className="picture"></img>
    </div>
  );
}

export default Author;
