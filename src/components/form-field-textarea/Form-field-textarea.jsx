import './Form-field-textarea.scss';

function FormFieldTextarea({
  label,
  placeholder,
  register,
  name,
  defaultValue,
  error,
  value,
  onChange,
}) {
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
        value={value}
        onChange={onChange}
      ></textarea>
    </label>
  );
}

export default FormFieldTextarea;
