import React from 'react';
import Header from './components/Header';
import OKRTree from './components/OKRTree';
import Legend from './components/Legend';
import { okrData } from './data/okrData';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 p-6">
          <Legend />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 h-screen">
          <OKRTree data={okrData} />
        </div>
      </div>
    </div>
  );
}

export default App;