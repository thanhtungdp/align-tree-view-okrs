import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import Header from './components/Header';
import OKRTree from './components/OKRTree';
import SidebarOverlay from './components/SidebarOverlay';
import { okrData as initialOKRData } from './data/okrData';
import { OKRData } from './types/okr';

function App() {
  const [okrData, setOkrData] = useState<OKRData>(initialOKRData);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="relative">
        {/* Toggle Button */}
        <button
          onClick={() => setShowSidebar(true)}
          className="fixed top-20 left-4 z-30 bg-white text-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105"
          title="Hướng dẫn & Phân cấp"
        >
          <Lightbulb className="w-5 h-5" />
        </button>

        {/* Main Content - Full Width */}
        <div className="h-screen">
          <OKRTree data={okrData} onDataChange={setOkrData} />
        </div>

        {/* Sidebar Overlay */}
        <SidebarOverlay 
          isOpen={showSidebar} 
          onClose={() => setShowSidebar(false)} 
        />
      </div>
    </div>
  );
}

export default App;