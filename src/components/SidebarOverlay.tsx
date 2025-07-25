import React from 'react';
import { Building2, Users, User, X } from 'lucide-react';

interface SidebarOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarOverlay: React.FC<SidebarOverlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Hướng dẫn & Phân cấp</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Legend Section */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Phân cấp OKRs</h3>
              
              <div className="space-y-4">
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
            </div>

            {/* Progress Legend */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-800 mb-3">Tiến độ</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">≥80%: Xuất sắc</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">60-79%: Tốt</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">40-59%: Cần cải thiện</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">&lt;40%: Nguy hiểm</span>
                </div>
              </div>
            </div>

            {/* Guide Section */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-800 mb-3">Hướng dẫn sử dụng</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Click vào nút "Chi tiết thêm" để xem metrics và actions
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Sử dụng nút "Dọc/Ngang" để thay đổi layout
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Click "Thêm con" để tạo mục tiêu con
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Kéo thả để di chuyển nodes
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Zoom và pan để khám phá cây OKR
                </li>
              </ul>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-800 mb-3">Phím tắt</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Fit View</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl + F</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Zoom In</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl + +</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Zoom Out</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl + -</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarOverlay;