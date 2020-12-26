import './Form-field-textarea.scss';

function FormFieldTextarea({ label, placeholder, register, name, defaultValue, error }) {
  /* eslint-disable-next-line no-console */
  console.log('in FormFieldTextarea: defaultValue', defaultValue);
  return (
    <label className="label">
      {label}
      <textarea
        placeholder={placeholder}
        type="text"
        className={`field field-textarea ${error ? 'field--wrong' : 'field--correct'}`}
        ref={register}
        name={name}
        defaultValue={defaultValue}
      ></textarea>
    </label>
  );
}

export default FormFieldTextarea;
