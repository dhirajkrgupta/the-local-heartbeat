export default function PostCard({ content, handle, createdAt }) {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <p className="text-gray-800">{content}</p>
      <div className="text-sm text-gray-500 mt-2">
        {handle} • {new Date(createdAt).toLocaleTimeString()}
      </div>
    </div>
  );
}
