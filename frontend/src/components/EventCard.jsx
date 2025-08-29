import { useState } from "react";

export default function EventCard({ event, onEdit, onDelete, onVote }) {
  const [editingEvent, setEditingEvent] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setEditingEvent({
      title: event.title,
      description: event.description,
      startTime: event.startTime,
      endTime: event.endTime,
    });
    setIsEditing(true);
  };

  const handleDelete = async () => {
    await onDelete(event.id);
  };

  const handleSave = async () => {
    await onEdit(event.id, editingEvent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingEvent({});
  };

  const formatDateTime = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-300 hover:border-gray-400 transition-colors shadow-sm">
      <div className="flex">
        {/* Vote section */}
        <div className="flex flex-col items-center p-2 w-12">
          <button
            onClick={() => onVote(event.id,1)}
            className="text-gray-400 hover:text-orange-500 p-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <span className="text-xs font-bold text-gray-700">{event.interested}</span>
          <button
            onClick={() => onVote(event.id,-1)}
            className="text-gray-400 hover:text-blue-600 p-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Content section */}
        <div className="flex-1 p-3">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span>•</span>
            <span>{formatDateTime(event.createdAt)}</span>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editingEvent.title}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, title: e.target.value })
                }
                placeholder="Event title"
                className="w-full bg-gray-50 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <textarea
                value={editingEvent.description}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, description: e.target.value })
                }
                rows="3"
                placeholder="Event description"
                className="w-full bg-gray-50 border border-gray-300 rounded-md p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="flex gap-2">
                <input
                  type="datetime-local"
                  value={editingEvent.startTime?.slice(0, 16)}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, startTime: e.target.value })
                  }
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="datetime-local"
                  value={editingEvent.endTime?.slice(0, 16) || ""}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, endTime: e.target.value })
                  }
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <input
                type="text"
                value={editingEvent.location}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, location: e.target.value })
                }
                placeholder="Location"
                className="w-full bg-gray-50 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-1.5 rounded text-sm hover:bg-green-600 transition-colors"
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
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{event.title}</h3>
              <p className="text-gray-700 text-sm mb-2">{event.description}</p>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">When:</span> {formatDateTime(event.startTime)}{" "}
                {event.endTime && `– ${formatDateTime(event.endTime)}`}
              </p>
              {event.location && (
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Where:</span> {event.location.name || event.location}
                </p>
              )}

              <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
                <button className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  {event.comments} comments
                </button>

                {event.isOwner && (
                  <>
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex items-center gap-1 hover:text-red-600 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
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
