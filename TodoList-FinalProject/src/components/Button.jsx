function Button({ name, disabled, onClick }) {
  return (
    <button
      className={`group inline-block rounded-sm bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[1px] hover:text-white focus:outline-hidden ${disabled ? 'opacity-20' : 'cursor-pointer'}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="block rounded-xs bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
        { name }
      </span>
    </button>
  );
}

export default Button;
