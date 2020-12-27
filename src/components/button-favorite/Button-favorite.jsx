import './Button-favorite.scss';

function ButtonFavorite({ onClick, disabled, isFavorited }) {
  const BASE_CLASS = 'btn-heart';
  let classes = `${BASE_CLASS}`;
  classes += isFavorited ? ` ${BASE_CLASS}--favorited` : '';
  return <input type="button" className={classes} disabled={disabled} onClick={onClick} />;
}

export default ButtonFavorite;
