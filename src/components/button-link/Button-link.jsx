import './Button-link.scss';
import { Link } from 'react-router-dom';

function ButtonLink({
  label,
  classModification,
  sizeMod = 'md',
  link = '',
  onClick,
  border = true,
}) {
  const BLOCK_CLASS = 'btn-link';
  let classes = `${BLOCK_CLASS} ${BLOCK_CLASS}--${classModification} ${BLOCK_CLASS}--${sizeMod}`;
  classes += border ? '' : ` ${BLOCK_CLASS}--no-border`;
  const buttonLink =
    link === '' ? (
      <input type="button" className={classes} value={label} onClick={onClick} />
    ) : (
      <Link to={link} className={classes}>
        {label}
      </Link>
    );
  return <div className="btn-link-container">{buttonLink}</div>;
}

export default ButtonLink;
