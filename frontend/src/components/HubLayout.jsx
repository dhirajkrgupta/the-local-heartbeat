import { useState } from "react";
import Sidebar from "./Sidebar";
import HeroSection from "./HeroSection";
import HubBanner from "./HubBanner";
export default function HubLayout({ hubName, hubIcon, hubDescription,hubbanner,handleSubmit, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} currentHub={hubName}/>
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        <HeroSection  setSidebarOpen={setSidebarOpen}/>
        <main className="max-w-4xl mx-auto px-4 py-6">
          <HubBanner hubName={hubName} hubIcon={hubIcon} hubDescription={hubDescription} hubbanner={hubbanner} handleSubmit={handleSubmit}/>
          <br />
          {children}
        </main>
      </div>
    </div>
  );
}