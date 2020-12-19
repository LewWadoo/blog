import './Form-header.scss';

function FormHeader({ name }) {
  return (
    <div className="form-header-container">
      <h5 className="form-header">{name}</h5>
    </div>
  );
}

export default FormHeader;
