import React from 'react';
import { Building2, Users, User } from 'lucide-react';

const Legend: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-800 mb-3">Phân cấp OKRs</h3>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-medium text-gray-800">Công ty</p>
            <p className="text-sm text-gray-600">Mục tiêu tổng thể của tổ chức</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-medium text-gray-800">Phòng ban</p>
            <p className="text-sm text-gray-600">Mục tiêu của từng bộ phận</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-lg">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-medium text-gray-800">Cá nhân</p>
            <p className="text-sm text-gray-600">Mục tiêu của từng thành viên</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="font-medium text-gray-800 mb-2">Tiến độ</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">≥80%: Xuất sắc</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">60-79%: Tốt</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">40-59%: Cần cải thiện</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">&lt;40%: Nguy hiểm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legend;