import { useState } from "react";

export default function PostCard({ post, onEdit, onDelete, onVote }) {
  const [editingContent, setEditingContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setEditingContent(post.content);
    setIsEditing(true);
  };
 const handleDelete=async()=>{
    
    await onDelete(post.id);
 }
  const handleSave =async () => {
    await onEdit(post.id, editingContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingContent('');
  };

  const getTime=(createdAt)=>{
    const date = new Date(createdAt)
    return date.toLocaleString()
  }

  return (
    <div className="bg-white rounded-lg border border-gray-300 hover:border-gray-400 transition-colors shadow-sm">
      <div className="flex">
        {/* Vote section */}
        <div className="flex flex-col items-center p-2 w-12">
          <button 
            onClick={() => onVote(post.id, 1)}
            className="text-gray-400 hover:text-orange-500 p-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <span className="text-xs font-bold text-gray-700">
            {post.votes}
          </span>
          <button 
            onClick={() => onVote(post.id, -1)}
            className="text-gray-400 hover:text-blue-600 p-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Content section */}
        <div className="flex-1 p-3">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span className="font-medium text-gray-700">u/{post.displayHandle}</span>
            <span>•</span>
            <span>{getTime(post.createdAt)}</span>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <textarea
                className="w-full bg-gray-50 border border-gray-300 rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                rows="3"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-600 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-700 px-4 py-1.5 rounded text-sm hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-900 text-sm leading-relaxed mb-3">
                {post.content}
              </p>

              <div className="flex items-center gap-4 text-xs text-gray-500">
                <button className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {post.comments} comments
                </button>

                {post.isOwner && (
                  <>
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex items-center gap-1 hover:text-red-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}