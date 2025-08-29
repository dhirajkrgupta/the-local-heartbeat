import { useState } from "react";

export default function CreatePost({ onSubmit, placeholder = "What's happening in your neighborhood?" }) {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content);
    setContent("");
  };

  return (
    <div className="bg-white rounded-lg border border-gray-300 mb-4 shadow-sm">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xs">U</span>
          </div>
          <div className="flex-1">
            <textarea
              className="w-full bg-gray-50 border border-gray-300 rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={placeholder}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="3"
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={handleSubmit}
                disabled={!content.trim()}
                className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
