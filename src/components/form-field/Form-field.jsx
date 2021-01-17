import './Form-field.scss';

function FormField({
  label,
  placeholder,
  register,
  name,
  defaultValue,
  error,
  onChange,
  type = 'text',
  isDisabled,
  value,
}) {
  return (
    <label className="label">
      {label}
      <input
        placeholder={placeholder}
        type={type}
        className={`field ${error ? 'field--wrong' : 'field--correct'}`}
        ref={register}
        onChange={onChange}
        name={name}
        defaultValue={defaultValue}
        disabled={isDisabled}
        value={value}
      />
    </label>
  );
}

export default FormField;
