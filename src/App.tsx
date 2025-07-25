import React, { useState } from 'react';
import Header from './components/Header';
import OKRTree from './components/OKRTree';
import Legend from './components/Legend';
import { okrData as initialOKRData } from './data/okrData';
import { OKRData } from './types/okr';

function App() {
  const [okrData, setOkrData] = useState<OKRData>(initialOKRData);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 p-6 space-y-6">
          <Legend />
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Hướng dẫn</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Click vào nút "Chi tiết thêm" để xem metrics và actions</li>
              <li>• Sử dụng nút "Dọc/Ngang" để thay đổi layout</li>
              <li>• Kéo thả để di chuyển nodes</li>
              <li>• Zoom và pan để khám phá cây OKR</li>
            </ul>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 h-screen">
          <OKRTree data={okrData} onDataChange={setOkrData} />
        </div>
      </div>
    </div>
  );
}

export default App;