export default function CategoryButton({ text }) {
  return (
    <button
      alt="tag button"
      className="p-2 m-1 text-xs text-white bg-gray-800 rounded-md backdrop-blur-sm"
    >
      {text}
    </button>
  );
}
