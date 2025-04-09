export function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 m-1"
    >
      {children}
    </button>
  );
}
