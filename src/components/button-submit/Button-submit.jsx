import './Button-submit.scss';

function ButtonSubmit({ label, classMod = '' }) {
  const BASE_CLASS = 'btn-submit';
  let classes = `${BASE_CLASS}`;
  classes += classMod ? ` ${BASE_CLASS}--${classMod}` : '';
  return <input type="submit" className={classes} value={label} autoFocus />;
}

export default ButtonSubmit;
