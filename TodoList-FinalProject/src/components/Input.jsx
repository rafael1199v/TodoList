function Input({ name, type, placeholder, maxlength, value, onChange }) {
  return (
    <label htmlFor={name} className="relative">
      <input
        type={ type }
        id={ name }
        placeholder={ placeholder }
        className="peer mt-0.5 w-full rounded border border-gray-300 shadow-sm sm:text-sm p-3 focus:outline-amber-500"
        onChange={ onChange }
        maxLength={ maxlength }
        value={value}
      />
    </label>
  );
}

export default Input;
