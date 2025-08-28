import React from 'react';
import Icons from './Icons';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: <Icons.FaHome /> },
    { id: 'apk-builder', label: 'بناء APK', icon: <Icons.FaCode /> },
    { id: 'apk-injector', label: 'حقن APK', icon: <Icons.FaPlug /> },
    { id: 'java-injector', label: 'حقن Java', icon: <Icons.FaCode /> },
    { id: 'control-panel', label: 'وحدة التحكم', icon: <Icons.FaCog /> },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white p-4 flex flex-col">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-1">صيانة تك</h1>
        <p className="text-sm text-gray-400">خدمة صيانة عن بعد</p>
      </div>

      <nav className="flex-1">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-700">
        <div className="flex items-center p-3 text-gray-400">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
            <span className="font-bold">ST</span>
          </div>
          <div>
            <p className="font-medium">فني صيانة</p>
            <p className="text-sm">admin@sayanatik.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
