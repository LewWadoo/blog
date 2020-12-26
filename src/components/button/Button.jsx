import './Button.scss';

function Button({ label, onClick, isFocused = false }) {
  const BASE_CLASS = 'button';
  let classes = `${BASE_CLASS}`;
  classes += isFocused ? ` ${BASE_CLASS}--focus` : '';
  return (
    <input
      type="button"
      className={classes}
      value={label}
      onClick={onClick}
      autoFocus={isFocused}
    />
  );
}

export default Button;
