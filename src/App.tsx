import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import Header from './components/Header';
import OKRTree from './components/OKRTree';
import SidebarOverlay from './components/SidebarOverlay';
import ProgressTimeline from './components/ProgressTimeline';
import { okrData as initialOKRData } from './data/okrData';
import { OKRData, QuarterlyOKRData } from './types/okr';

function App() {
  const [okrData, setOkrData] = useState<OKRData>(initialOKRData);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedQuarter, setSelectedQuarter] = useState<string>(`${okrData.currentYear}-Q${okrData.currentQuarter}`);
  const [showTimeline, setShowTimeline] = useState(false);

  const currentQuarterData = okrData.quarters[selectedQuarter];
  const availableQuarters = Object.keys(okrData.quarters).sort();

  const handleQuarterChange = (quarterKey: string) => {
    setSelectedQuarter(quarterKey);
  };

  const handleDataChange = (newQuarterData: QuarterlyOKRData) => {
    const updatedOKRData: OKRData = {
      ...okrData,
      quarters: {
        ...okrData.quarters,
        [selectedQuarter]: newQuarterData
      }
    };
    setOkrData(updatedOKRData);
  };

  // Calculate overall progress for current quarter
  const calculateOverallProgress = () => {
    if (!currentQuarterData) return 0;
    const objectives = Object.values(currentQuarterData.objectives);
    const companyObjectives = objectives.filter(obj => obj.level === 'company');
    if (companyObjectives.length === 0) return 0;
    
    const totalProgress = companyObjectives.reduce((sum, obj) => sum + obj.progress, 0);
    return Math.round(totalProgress / companyObjectives.length);
  };

  // Get objectives with historical progress for timeline
  const getObjectivesWithHistory = () => {
    if (!currentQuarterData) return [];
    return Object.values(currentQuarterData.objectives).filter(
      obj => obj.historicalProgress && obj.historicalProgress.length > 0
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentQuarter={okrData.currentQuarter}
        currentYear={okrData.currentYear}
        selectedQuarter={selectedQuarter}
        overallProgress={calculateOverallProgress()}
        availableQuarters={availableQuarters}
        onQuarterChange={handleQuarterChange}
      />
      
      <div className="relative">
        {/* Toggle Button */}
        <button
          onClick={() => setShowSidebar(true)}
          className="fixed top-20 left-4 z-30 bg-white text-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105"
          title="Hướng dẫn & Phân cấp"
        >
          <Lightbulb className="w-5 h-5" />
        </button>

        {/* Timeline Toggle */}
        <button
          onClick={() => setShowTimeline(!showTimeline)}
          className="fixed top-20 right-4 z-30 bg-white text-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105"
          title="Progress Timeline"
        >
          <span className="text-sm font-medium">Timeline</span>
        </button>

        {/* Progress Timeline */}
        {showTimeline && (
          <div className="fixed top-32 right-4 z-30 w-80 max-h-96 overflow-y-auto">
            {getObjectivesWithHistory().map((objective) => (
              <ProgressTimeline
                key={objective.id}
                historicalProgress={objective.historicalProgress || []}
                currentProgress={objective.progress}
                currentQuarter={okrData.currentQuarter}
                currentYear={okrData.currentYear}
                title={objective.title}
              />
            ))}
          </div>
        )}

        {/* Main Content - Full Width */}
        <div className="h-screen">
          {currentQuarterData ? (
            <OKRTree data={currentQuarterData} onDataChange={handleDataChange} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Data Available</h2>
                <p className="text-gray-600">No OKR data found for the selected quarter.</p>
              </div>
            </div>
          )}
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