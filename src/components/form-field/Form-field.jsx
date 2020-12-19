import './Form-field.scss';

function FormField({ label, placeholder, register, name, defaultValue, error }) {
  return (
    <label className="label">
      {label}
      <input
        placeholder={placeholder}
        type="text"
        className={`field ${error ? 'field--wrong' : 'field--correct'}`}
        ref={register}
        name={name}
        defaultValue={defaultValue}
      />
      {/* <input placeholder={placeholder} type="text" className="field" onChange={handleChange} value={value} ref={register} name={name}/> */}
    </label>
  );
}

export default FormField;
