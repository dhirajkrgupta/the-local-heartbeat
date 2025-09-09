import { useState } from "react";

export default function EventForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async () => {
    if (!title.trim() || !date || !time) return;

    const eventData = {
      title,
      description,
      startTime: new Date(`${date}T${time}`), // store as UTC date
    };

    console.log("submitting event:", eventData);
    await onSubmit(eventData);

    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
  };

  return (
    <div className="bg-white rounded-lg border border-gray-300 mb-4 shadow-sm">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xs">E</span>
          </div>
          <div className="flex-1 space-y-3">
            {/* Title */}
            <input
              type="text"
              placeholder="Event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />

            {/* Description */}
            <textarea
              placeholder="Event description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full bg-gray-50 border border-gray-300 rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />

            {/* Date + Time */}
            <div className="flex gap-3">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end mt-3">
              <button
                onClick={handleSubmit}
                disabled={!title.trim() || !date || !time}
                className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
