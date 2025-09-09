import React from 'react'

const HubHeroSection = ({setSidebarOpen}) => {
  return (
    <header className="bg-white border-b border-gray-300 shadow-sm">
          <div className="px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(prev=>!prev)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
                <div className="flex items-center gap-3">
                    <img className='h-10 scale-150' src="./logo2.png" alt="logo" />
                    <img className='h-10' src="./name2.png" alt="name" />
                </div>
            </div>
          </div>
        </header>
  )
}

export default HubHeroSection
