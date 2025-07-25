import React from 'react';
import { Target, TrendingUp, Calendar } from 'lucide-react';

interface HeaderProps {
  currentQuarter: number;
  currentYear: number;
  selectedQuarter: string;
  overallProgress: number;
}

const Header: React.FC<HeaderProps> = ({ 
  currentQuarter, 
  currentYear, 
  selectedQuarter, 
  overallProgress 
}) => {
  const getQuarterDisplay = (quarterKey: string) => {
    const [year, quarter] = quarterKey.split('-');
    return `${quarter} ${year}`;
  };

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
          
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <div className="flex items-center space-x-1 text-blue-600">
                <Calendar className="w-4 h-4" />
                <span className="text-lg font-bold">{getQuarterDisplay(selectedQuarter)}</span>
              </div>
              <p className="text-xs text-gray-500">Viewing Quarter</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-lg font-bold">{overallProgress}%</span>
              </div>
              <p className="text-xs text-gray-500">Overall Progress</p>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">Q{currentQuarter} {currentYear}</div>
              <p className="text-xs text-gray-500">Current Quarter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;