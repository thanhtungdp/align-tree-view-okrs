import React, { useState } from 'react';
import { X, Plus, Target, TrendingUp } from 'lucide-react';
import { OKRObjective, OKRMetric, OKRAction } from '../types/okr';

interface AddNodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (objective: Omit<OKRObjective, 'id' | 'childrenIds'>) => void;
  parentNode: OKRObjective;
}

const AddNodeModal: React.FC<AddNodeModalProps> = ({ isOpen, onClose, onAdd, parentNode }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    owner: '',
    progress: 0,
  });
  
  const [metrics, setMetrics] = useState<Omit<OKRMetric, 'id'>[]>([]);
  const [actions, setActions] = useState<Omit<OKRAction, 'id'>[]>([]);

  const getChildLevel = (parentLevel: string): 'company' | 'department' | 'individual' => {
    if (parentLevel === 'company') return 'department';
    if (parentLevel === 'department') return 'individual';
    return 'individual';
  };

  const getDepartmentOptions = () => {
    const childLevel = getChildLevel(parentNode.level);
    if (childLevel === 'department') {
      return ['Sales', 'Marketing', 'Product', 'Engineering', 'HR', 'Finance'];
    }
    return parentNode.department ? [parentNode.department] : [];
  };

  const addMetric = () => {
    setMetrics([...metrics, {
      name: '',
      current: 0,
      target: 100,
      unit: '',
      progress: 0
    }]);
  };

  const updateMetric = (index: number, field: keyof Omit<OKRMetric, 'id'>, value: string | number) => {
    const updatedMetrics = [...metrics];
    updatedMetrics[index] = { ...updatedMetrics[index], [field]: value };
    if (field === 'current' || field === 'target') {
      const current = field === 'current' ? Number(value) : updatedMetrics[index].current;
      const target = field === 'target' ? Number(value) : updatedMetrics[index].target;
      updatedMetrics[index].progress = target > 0 ? Math.round((current / target) * 100) : 0;
    }
    setMetrics(updatedMetrics);
  };

  const removeMetric = (index: number) => {
    setMetrics(metrics.filter((_, i) => i !== index));
  };

  const addAction = () => {
    setActions([...actions, {
      title: '',
      status: 'not-started',
      dueDate: new Date().toISOString().split('T')[0],
      assignee: ''
    }]);
  };

  const updateAction = (index: number, field: keyof Omit<OKRAction, 'id'>, value: string) => {
    const updatedActions = [...actions];
    updatedActions[index] = { ...updatedActions[index], [field]: value };
    setActions(updatedActions);
  };

  const removeAction = (index: number) => {
    setActions(actions.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const childLevel = getChildLevel(parentNode.level);
    const department = childLevel === 'individual' ? parentNode.department : 
                     childLevel === 'department' ? getDepartmentOptions()[0] : undefined;

    const newObjective: Omit<OKRObjective, 'id' | 'childrenIds'> = {
      ...formData,
      level: childLevel,
      department,
      parentId: parentNode.id,
      metrics: metrics.map((metric, index) => ({
        ...metric,
        id: `m${Date.now()}-${index}`
      })),
      actions: actions.map((action, index) => ({
        ...action,
        id: `a${Date.now()}-${index}`
      }))
    };

    onAdd(newObjective);
    
    // Reset form
    setFormData({ title: '', description: '', owner: '', progress: 0 });
    setMetrics([]);
    setActions([]);
    onClose();
  };

  if (!isOpen) return null;

  const childLevel = getChildLevel(parentNode.level);
  const levelName = childLevel === 'individual' ? 'Cá nhân' : 
                   childLevel === 'department' ? 'Phòng ban' : 'Công ty';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Thêm mục tiêu {levelName} mới
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiêu đề mục tiêu *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập tiêu đề mục tiêu..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả chi tiết *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Mô tả chi tiết về mục tiêu này..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Người chịu trách nhiệm *
              </label>
              <input
                type="text"
                required
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tên người chịu trách nhiệm..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiến độ hiện tại (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Metrics Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Chỉ số đo lường
              </h3>
              <button
                type="button"
                onClick={addMetric}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm chỉ số</span>
              </button>
            </div>

            {metrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 mb-3">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-gray-800">Chỉ số {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeMetric(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Tên chỉ số"
                    value={metric.name}
                    onChange={(e) => updateMetric(index, 'name', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Đơn vị"
                    value={metric.unit}
                    onChange={(e) => updateMetric(index, 'unit', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Giá trị hiện tại"
                    value={metric.current}
                    onChange={(e) => updateMetric(index, 'current', Number(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Mục tiêu"
                    value={metric.target}
                    onChange={(e) => updateMetric(index, 'target', Number(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Tiến độ: {metric.progress}%
                </div>
              </div>
            ))}
          </div>

          {/* Actions Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Hành động
              </h3>
              <button
                type="button"
                onClick={addAction}
                className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm hành động</span>
              </button>
            </div>

            {actions.map((action, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 mb-3">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-gray-800">Hành động {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeAction(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Tiêu đề hành động"
                    value={action.title}
                    onChange={(e) => updateAction(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={action.status}
                      onChange={(e) => updateAction(index, 'status', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="not-started">Chưa bắt đầu</option>
                      <option value="in-progress">Đang thực hiện</option>
                      <option value="completed">Hoàn thành</option>
                    </select>
                    <input
                      type="date"
                      value={action.dueDate}
                      onChange={(e) => updateAction(index, 'dueDate', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Người thực hiện (tùy chọn)"
                    value={action.assignee || ''}
                    onChange={(e) => updateAction(index, 'assignee', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Thêm mục tiêu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNodeModal;