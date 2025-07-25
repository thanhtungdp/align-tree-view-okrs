import React from 'react';
import { Target, TrendingUp } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Simplamo OKRs</h1>
              <p className="text-sm text-gray-600">Objectives and Key Results Management</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-lg font-bold">65%</span>
              </div>
              <p className="text-xs text-gray-500">Overall Progress</p>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">Q2 2025</div>
              <p className="text-xs text-gray-500">Current Quarter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;