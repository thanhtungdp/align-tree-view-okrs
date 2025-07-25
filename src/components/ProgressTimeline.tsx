import React from 'react';
import { TrendingUp, Calendar, Target } from 'lucide-react';
import { HistoricalProgress } from '../types/okr';

interface ProgressTimelineProps {
  historicalProgress: HistoricalProgress[];
  currentProgress: number;
  currentQuarter: number;
  currentYear: number;
  title: string;
}

const ProgressTimeline: React.FC<ProgressTimelineProps> = ({
  historicalProgress,
  currentProgress,
  currentQuarter,
  currentYear,
  title
}) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgressTextColor = (progress: number) => {
    if (progress >= 80) return 'text-green-700';
    if (progress >= 60) return 'text-blue-700';
    if (progress >= 40) return 'text-yellow-700';
    return 'text-red-700';
  };

  // Combine historical and current data
  const allProgress = [
    ...historicalProgress,
    {
      quarter: currentQuarter,
      year: currentYear,
      progress: currentProgress,
      metrics: [],
      completedActions: 0,
      totalActions: 0
    }
  ].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.quarter - b.quarter;
  });

  if (allProgress.length <= 1) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
          Progress Timeline: {title}
        </h3>
        <div className="text-sm text-gray-500">
          {allProgress.length} quarters tracked
        </div>
      </div>

      <div className="space-y-4">
        {/* Timeline Visualization */}
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            {allProgress.map((progress, index) => {
              const isCurrent = progress.quarter === currentQuarter && progress.year === currentYear;
              
              return (
                <div key={`${progress.year}-Q${progress.quarter}`} className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full border-2 border-white shadow-md ${
                    getProgressColor(progress.progress)
                  } ${isCurrent ? 'ring-2 ring-blue-300' : ''}`} />
                  <div className="text-xs text-gray-600 mt-1">
                    Q{progress.quarter}
                  </div>
                  <div className={`text-xs font-medium mt-1 ${getProgressTextColor(progress.progress)}`}>
                    {progress.progress}%
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Connection Line */}
          <div className="absolute top-2 left-2 right-2 h-0.5 bg-gray-200 -z-10" />
        </div>

        {/* Progress Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {allProgress.map((progress, index) => {
            const isCurrent = progress.quarter === currentQuarter && progress.year === currentYear;
            const prevProgress = index > 0 ? allProgress[index - 1] : null;
            const progressChange = prevProgress ? progress.progress - prevProgress.progress : 0;
            
            return (
              <div
                key={`${progress.year}-Q${progress.quarter}`}
                className={`p-3 rounded-lg border ${
                  isCurrent 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">
                      Q{progress.quarter} {progress.year}
                    </span>
                  </div>
                  {isCurrent && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Current
                    </span>
                  )}
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Progress:</span>
                    <span className={`text-sm font-bold ${getProgressTextColor(progress.progress)}`}>
                      {progress.progress}%
                    </span>
                  </div>
                  
                  {progressChange !== 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Change:</span>
                      <span className={`text-xs font-medium ${
                        progressChange > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {progressChange > 0 ? '+' : ''}{progressChange}%
                      </span>
                    </div>
                  )}
                  
                  {progress.completedActions > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Actions:</span>
                      <span className="text-xs text-gray-700">
                        {progress.completedActions}/{progress.totalActions}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressTimeline;