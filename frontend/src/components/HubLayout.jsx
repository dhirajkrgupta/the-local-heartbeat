import { useState } from "react";
import Sidebar from "./Sidebar";
export default function HubLayout({ hubName, hubIcon, hubDescription, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentHub="townsquare" // This would be dynamic in real app
      />
      
      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-300 shadow-sm">
          <div className="px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">{hubIcon}</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">r/{hubName}</h1>
              <span className="text-sm text-gray-500">• {hubDescription}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="max-w-4xl mx-auto px-4 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}