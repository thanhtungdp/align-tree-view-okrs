import React from 'react';
import { Handle, Position } from 'reactflow';
import { Session } from '../types/okr';
import { Calendar, Clock, Target } from 'lucide-react';

interface SessionNodeProps {
  data: Session & { goalCount?: number };
}

const SessionNode: React.FC<SessionNodeProps> = ({ data }) => {
  const getSessionColor = (type: string, isActive: boolean) => {
    if (type === 'year') {
      return isActive ? 'from-indigo-600 to-indigo-700' : 'from-indigo-400 to-indigo-500';
    }
    return isActive ? 'from-emerald-600 to-emerald-700' : 'from-emerald-400 to-emerald-500';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 min-w-[280px] max-w-[320px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-gray-400"
      />
      
      {/* Header */}
      <div className={`bg-gradient-to-r ${getSessionColor(data.type, data.isActive)} text-white p-4 rounded-t-xl`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span className="font-semibold text-sm uppercase tracking-wide">
              {data.type === 'year' ? 'Năm' : 'Quý'}
            </span>
          </div>
          {data.isActive && (
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              Active
            </span>
          )}
        </div>
        <h3 className="font-bold text-xl mt-2">{data.title}</h3>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Bắt đầu:</span>
            <span className="font-medium text-gray-800">{formatDate(data.startDate)}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Kết thúc:</span>
            <span className="font-medium text-gray-800">{formatDate(data.endDate)}</span>
          </div>
          
          {data.goalCount !== undefined && (
            <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-200">
              <span className="text-gray-600 flex items-center">
                <Target className="w-4 h-4 mr-1" />
                Số mục tiêu:
              </span>
              <span className="font-bold text-lg text-blue-600">{data.goalCount}</span>
            </div>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-gray-400"
      />
    </div>
  );
};

export default SessionNode;