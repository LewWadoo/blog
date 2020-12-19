import './Button-submit.scss';

function ButtonSubmit({ label }) {
  return <input type="submit" className="btn-submit" value={label} />;
}

export default ButtonSubmit;
