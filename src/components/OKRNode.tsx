import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { OKRObjective } from '../types/okr';
import { 
  Target, 
  TrendingUp, 
  Users, 
  Building2, 
  User,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus
} from 'lucide-react';

interface OKRNodeProps {
  data: OKRObjective & {
    layoutDirection?: 'TB' | 'LR';
    onAddChild?: (nodeId: string) => void;
    onExpansionChange?: (nodeId: string, isExpanded: boolean) => void;
  };
}

const OKRNode: React.FC<OKRNodeProps> = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpansionChange = (newExpanded: boolean) => {
    setExpanded(newExpanded);
    if (data.onExpansionChange) {
      data.onExpansionChange(data.id, newExpanded);
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'company':
        return <Building2 className="w-5 h-5" />;
      case 'department':
        return <Users className="w-5 h-5" />;
      case 'individual':
        return <User className="w-5 h-5" />;
      default:
        return <Target className="w-5 h-5" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'company':
        return 'from-blue-500 to-blue-600';
      case 'department':
        return 'from-green-500 to-green-600';
      case 'individual':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'not-started':
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const canHaveChildren = data.level !== 'individual';
  const isHorizontal = data.layoutDirection === 'LR';
  
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 min-w-[320px] max-w-[400px]">
      <Handle
        type="target"
        position={isHorizontal ? Position.Left : Position.Top}
        className="w-3 h-3 !bg-gray-400"
      />
      
      {/* Header */}
      <div className={`bg-gradient-to-r ${getLevelColor(data.level)} text-white p-4 rounded-t-xl`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Avatar */}
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-sm">
                {data.owner.split(' ').map(name => name.charAt(0)).join('').slice(0, 2)}
              </span>
            </div>
            
            {/* Level Icon and Label */}
            <div className="flex items-center space-x-2">
            {getLevelIcon(data.level)}
            <span className="font-semibold text-sm uppercase tracking-wide">
              {data.level === 'individual' ? 'Cá nhân' : 
               data.level === 'department' ? 'Phòng ban' : 'Công ty'}
            </span>
            </div>
          </div>
          {data.department && (
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
              {data.department}
            </span>
          )}
        </div>
        
        {/* Title and Owner */}
        <div className="mt-3 ml-13">
          <h3 className="font-bold text-lg leading-tight">{data.title}</h3>
          <p className="text-sm opacity-90 mt-1">{data.owner}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-3 bg-gray-50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Tiến độ</span>
          <span className="text-sm font-bold text-gray-900">{data.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(data.progress)}`}
            style={{ width: `${data.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{data.description}</p>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => handleExpansionChange(!expanded)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            <span>Chi tiết {expanded ? 'ít hơn' : 'thêm'}</span>
          </button>
          
          {canHaveChildren && (
            <button
              onClick={() => data.onAddChild && data.onAddChild(data.id)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
              title="Thêm mục tiêu con"
            >
              <Plus className="w-3 h-3" />
              <span>Thêm con</span>
            </button>
          )}
        </div>

        {expanded && (
          <div className="space-y-4 animate-fadeIn">
            {/* Metrics */}
            {data.metrics.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Chỉ số đo lường
                </h4>
                <div className="space-y-2">
                  {data.metrics.map((metric) => (
                    <div key={metric.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{metric.name}</span>
                        <span className="text-xs text-gray-500">{metric.progress}%</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">
                          {metric.current.toLocaleString()} / {metric.target.toLocaleString()} {metric.unit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${metric.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            {data.actions.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Hành động
                </h4>
                <div className="space-y-2">
                  {data.actions.map((action) => (
                    <div key={action.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        {getStatusIcon(action.status)}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{action.title}</p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-500">
                              Deadline: {new Date(action.dueDate).toLocaleDateString('vi-VN')}
                            </span>
                            {action.assignee && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {action.assignee}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={isHorizontal ? Position.Right : Position.Bottom}
        className="w-3 h-3 !bg-gray-400"
      />
    </div>
  );
};

export default OKRNode;