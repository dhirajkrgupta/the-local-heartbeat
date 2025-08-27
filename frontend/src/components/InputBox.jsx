export default function InputBox({ value, onChange, onSubmit }) {
  return (
    <div className="p-4 bg-white shadow rounded-lg flex gap-2">
      <input
        type="text"
        placeholder="What's happening?"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 border rounded px-3 py-2"
      />
      <button
        onClick={onSubmit}
        className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
      >
        Post
      </button>
    </div>
  );
}
