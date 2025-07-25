import React from 'react';
import { Calendar, TrendingUp, ChevronDown } from 'lucide-react';

interface QuarterSelectorProps {
  currentQuarter: number;
  currentYear: number;
  availableQuarters: string[];
  onQuarterChange: (quarterKey: string) => void;
  selectedQuarter: string;
}

const QuarterSelector: React.FC<QuarterSelectorProps> = ({
  currentQuarter,
  currentYear,
  availableQuarters,
  onQuarterChange,
  selectedQuarter
}) => {
  const getQuarterInfo = (quarterKey: string) => {
    const [year, quarter] = quarterKey.split('-');
    return {
      year: parseInt(year),
      quarter: parseInt(quarter.replace('Q', ''))
    };
  };

  const getQuarterName = (quarterKey: string) => {
    const { year, quarter } = getQuarterInfo(quarterKey);
    return `Q${quarter} ${year}`;
  };

  const isCurrentQuarter = (quarterKey: string) => {
    const { year, quarter } = getQuarterInfo(quarterKey);
    return year === currentYear && quarter === currentQuarter;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-800">Chọn Quarter</h3>
        </div>
        <div className="text-sm text-gray-500">
          Hiện tại: Q{currentQuarter} {currentYear}
        </div>
      </div>

      <div className="space-y-2">
        {availableQuarters.map((quarterKey) => {
          const isSelected = quarterKey === selectedQuarter;
          const isCurrent = isCurrentQuarter(quarterKey);
          
          return (
            <button
              key={quarterKey}
              onClick={() => onQuarterChange(quarterKey)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 ${
                isSelected
                  ? 'bg-blue-50 border-blue-200 text-blue-800'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    isCurrent ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                  <span className="font-medium">
                    {getQuarterName(quarterKey)}
                  </span>
                  {isCurrent && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Hiện tại
                    </span>
                  )}
                </div>
                {isSelected && <ChevronDown className="w-4 h-4" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Progress Timeline Preview */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2" />
          Timeline Overview
        </h4>
        <div className="flex space-x-2">
          {availableQuarters.map((quarterKey, index) => {
            const isSelected = quarterKey === selectedQuarter;
            const isCurrent = isCurrentQuarter(quarterKey);
            
            return (
              <div
                key={quarterKey}
                className={`flex-1 h-2 rounded-full transition-all duration-200 ${
                  isSelected
                    ? 'bg-blue-500'
                    : isCurrent
                    ? 'bg-green-500'
                    : 'bg-gray-200'
                }`}
                title={getQuarterName(quarterKey)}
              />
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          {availableQuarters.map((quarterKey) => (
            <span key={quarterKey}>
              Q{getQuarterInfo(quarterKey).quarter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuarterSelector;