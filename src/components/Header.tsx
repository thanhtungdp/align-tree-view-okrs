import React from 'react';
import { Target, TrendingUp, Calendar, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentQuarter: number;
  currentYear: number;
  selectedQuarter: string;
  overallProgress: number;
  availableQuarters: string[];
  onQuarterChange: (quarterKey: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  currentQuarter, 
  currentYear, 
  selectedQuarter, 
  overallProgress,
  availableQuarters,
  onQuarterChange
}) => {
  const getQuarterDisplay = (quarterKey: string) => {
    const [year, quarter] = quarterKey.split('-');
    return `${quarter} ${year}`;
  };

  const getQuarterInfo = (quarterKey: string) => {
    const [year, quarter] = quarterKey.split('-');
    return {
      year: parseInt(year),
      quarter: parseInt(quarter.replace('Q', ''))
    };
  };

  const isCurrentQuarter = (quarterKey: string) => {
    const { year, quarter } = getQuarterInfo(quarterKey);
    return year === currentYear && quarter === currentQuarter;
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
          
          <div className="flex items-center space-x-6">
            {/* Quarter Selector */}
            <div className="relative">
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Viewing Quarter
              </label>
              <div className="relative">
                <select
                  value={selectedQuarter}
                  onChange={(e) => onQuarterChange(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {availableQuarters.map((quarterKey) => {
                    const isCurrent = isCurrentQuarter(quarterKey);
                    return (
                      <option key={quarterKey} value={quarterKey}>
                        {getQuarterDisplay(quarterKey)} {isCurrent ? '(Current)' : ''}
                      </option>
                    );
                  })}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Timeline Preview */}
            <div className="text-center">
              <div className="text-xs font-medium text-gray-500 mb-1">Timeline</div>
              <div className="flex space-x-1">
                {availableQuarters.map((quarterKey) => {
                  const isSelected = quarterKey === selectedQuarter;
                  const isCurrent = isCurrentQuarter(quarterKey);
                  
                  return (
                    <button
                      key={quarterKey}
                      onClick={() => onQuarterChange(quarterKey)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        isSelected
                          ? 'bg-blue-500 ring-2 ring-blue-200'
                          : isCurrent
                          ? 'bg-green-500'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      title={`${getQuarterDisplay(quarterKey)}${isCurrent ? ' (Current)' : ''}`}
                    />
                  );
                })}
              </div>
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