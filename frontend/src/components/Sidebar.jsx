import { useNavigate } from "react-router-dom";


export default function Sidebar({ isOpen, onToggle, currentHub }) {
    const navigate = useNavigate();
  const hubs = [
    { id: 'townsquare', name: 'Town Square', icon: '🏛️', path: '/' },
    { id: 'bulletin', name: 'Bulletin Board', icon: '📌', path: '/bulletin' },
    { id: 'lostfound', name: 'Lost & Found', icon: '🔍', path: '/lostfound' },
    { id: 'helpdesk', name: 'Help Desk', icon: '🆘', path: '/helpdesk' },
    { id: 'events', name: 'Events', icon: '🎉', path: '/events' }
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-300 shadow-lg z-30 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Community Hubs</h2>
            <button
              onClick={onToggle}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <nav className="p-2">
          {hubs.map((hub) => (
            <button
              key={hub.id}
              onClick={() => {
                // In real app, use navigate() from react-router
                console.log(`Navigate to ${hub.path}`);
                navigate(hub.path);
                onToggle(); // Close sidebar on mobile
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-100 transition-colors ${
                currentHub === hub.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              }`}
            >
              <span className="text-lg">{hub.icon}</span>
              <span className="font-medium">{hub.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}