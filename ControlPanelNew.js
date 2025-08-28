import React, { useState, useEffect } from 'react';
import DeviceAdvancedMenu from './DeviceAdvancedMenu';
import {
  FaDesktop, FaMobile, FaTabletAlt, FaUsers, FaPlug, FaLock, FaChartLine,
  FaCog, FaPowerOff, FaSearch, FaFilter, FaEllipsisV, FaExclamationCircle,
  FaCheckCircle, FaInfoCircle, FaDownload, FaCamera, FaMicrophone, FaVideo, FaKey, FaFile, FaUser, FaLockOpen
} from 'react-icons/fa';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const ControlPanel = () => {
  // بيانات الجهاز
  const [devices, setDevices] = useState([
    {
      id: '1',
      name: 'جوال Samsung Galaxy S21',
      type: 'mobile',
      status: 'online',
      battery: 85,
      lastSeen: 'منذ 5 دقائق',
      ip: '192.168.1.105',
      location: 'الرياض',
      features: ['تحكم كامل', 'مراقبة', 'تحميل الملفات']
    },
    {
      id: '2',
      name: 'جوال iPhone 13',
      type: 'mobile',
      status: 'online',
      battery: 62,
      lastSeen: 'الآن',
      ip: '192.168.1.108',
      location: 'جدة',
      features: ['تحكم كامل', 'مراقبة']
    },
    {
      id: '3',
      name: 'جوال Xiaomi Redmi',
      type: 'mobile',
      status: 'offline',
      battery: 45,
      lastSeen: 'منذ ساعة',
      ip: '192.168.1.112',
      location: 'الدمام',
      features: ['مراقبة']
    },
    {
      id: '4',
      name: 'جهاز لوحي iPad',
      type: 'tablet',
      status: 'online',
      battery: 78,
      lastSeen: 'منذ دقيقتين',
      ip: '192.168.1.115',
      location: 'الرياض',
      features: ['تحكم كامل', 'مراقبة', 'تحميل الملفات']
    }
  ]);

  // حالة القائمة المنسدلة لكل جهاز
  const [openDeviceMenu, setOpenDeviceMenu] = useState(null);

  // بيانات الأنشطة
  const [activities, setActivities] = useState([
    { id: '1', device: 'جوال Samsung Galaxy S21', action: 'بدء الجلسة', time: '10:30:25', status: 'success' },
    { id: '2', device: 'جوال iPhone 13', action: 'تحميل ملف', time: '10:28:15', status: 'success' },
    { id: '3', device: 'جهاز لوحي iPad', action: 'اتصال فشل', time: '10:25:40', status: 'error' },
    { id: '4', device: 'جوال Xiaomi Redmi', action: 'انقطاع الاتصال', time: '10:20:10', status: 'warning' },
    { id: '5', device: 'جوال Samsung Galaxy S21', action: 'تشغيل الكاميرا', time: '10:15:30', status: 'success' }
  ]);

  // إحصائيات الجلسات
  const [sessionStats, setSessionStats] = useState([
    { name: 'الاثنين', sessions: 12, duration: '3:45' },
    { name: 'الثلاثاء', sessions: 8, duration: '2:30' },
    { name: 'الأربعاء', sessions: 15, duration: '4:15' },
    { name: 'الخميس', sessions: 10, duration: '3:20' },
    { name: 'الجمعة', sessions: 6, duration: '1:50' },
    { name: 'السبت', sessions: 18, duration: '5:10' },
    { name: 'الأحد', sessions: 14, duration: '4:05' }
  ]);

  // إحصائيات الأجهزة
  const [deviceStats, setDeviceStats] = useState([
    { name: 'جوالات', value: 65 },
    { name: 'أجهزة لوحية', value: 20 },
    { name: 'أجهزة كمبيوتر', value: 15 }
  ]);

  // إحصائيات الحالة
  const [statusStats, setStatusStats] = useState([
    { name: 'متصل', value: 75 },
    { name: 'غير متصل', value: 25 }
  ]);

  // دالة لفتق وإغلاق القائمة المنسدلة لكل جهاز
  const toggleDeviceMenu = (deviceId) => {
    setOpenDeviceMenu(openDeviceMenu === deviceId ? null : deviceId);
  };

  // دالة لتنفيذ أوامر متقدمة
  const executeAdvancedCommand = (deviceId, command) => {
    // هنا سيتم تنفيذ الأمر المتقدم
    console.log(`تنفيذ الأمر المتقدم: ${command} على الجهاز: ${deviceId}`);
    // إغلاق القائمة بعد التنفيذ
    setOpenDeviceMenu(null);
  };

  // إعدادات التحكم
  const [controlSettings, setControlSettings] = useState({
    autoReconnect: true,
    maxConnections: 10,
    sessionTimeout: 30, // بالدقائق
    encryption: true,
    logging: true
  });

  // الأوامر النشطة
  const [activeCommands, setActiveCommands] = useState([
    { id: '1', device: 'جوال Samsung Galaxy S21', command: 'تحميل ملف', progress: 75, time: '10:28:15' },
    { id: '2', device: 'جوال iPhone 13', command: 'تشغيل الكاميرا', progress: 30, time: '10:25:10' }
  ]);

  // البحث والفلتر
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // تصفية الأجهزة بناءً على البحث والحالة
  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.ip.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || device.status === filter;
    return matchesSearch && matchesFilter;
  });

  // تنفيذ أمر
  const executeCommand = (deviceId, command) => {
    const device = devices.find(d => d.id === deviceId);
    if (device) {
      const newActivity = {
        id: activities.length + 1,
        device: device.name,
        action: command,
        time: new Date().toLocaleTimeString(),
        status: 'success'
      };
      setActivities([newActivity, ...activities]);
    }
  };

  // إنهاء جلسة
  const terminateSession = (deviceId) => {
    const device = devices.find(d => d.id === deviceId);
    if (device) {
      const newActivity = {
        id: activities.length + 1,
        device: device.name,
        action: 'إنهاء الجلسة',
        time: new Date().toLocaleTimeString(),
        status: 'warning'
      };
      setActivities([newActivity, ...activities]);
    }
  };

  // الألوان للرسوم البيانية
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">وحدة التحكم</h1>
        <div className="text-sm text-gray-500">آخر تحديث: ١٥ مايو ٢٠٢٣</div>
      </div>

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">إجمالي الأجهزة</p>
              <p className="text-3xl font-bold mt-2">42</p>
              <p className="text-green-500 text-sm mt-1">+5% هذا الشهر</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FaMobile className="text-blue-600 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">الأجهزة المتصلة</p>
              <p className="text-3xl font-bold mt-2">28</p>
              <p className="text-green-500 text-sm mt-1">+3% اليوم</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FaPlug className="text-green-600 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">الجلسات النشطة</p>
              <p className="text-3xl font-bold mt-2">12</p>
              <p className="text-red-500 text-sm mt-1">-2% اليوم</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <FaUsers className="text-yellow-600 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">الأوامر النشطة</p>
              <p className="text-3xl font-bold mt-2">8</p>
              <p className="text-green-500 text-sm mt-1">+10% هذا اليوم</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <FaCog className="text-purple-600 text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* الأوامر النشطة */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">الأوامر النشطة</h2>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="بحث..."
              className="pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الامر</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التقدم</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الوقت</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activeCommands.map((command) => (
                <tr key={command.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{command.device}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{command.command}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${command.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{command.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{command.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => executeCommand(command.device, command.command)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      إيقاف
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => terminateSession(command.device)}
                    >
                      إنهاء
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* قائمة الأجهزة */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">قائمة الأجهزة</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="بحث..."
                className="pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                onClick={() => setFilter('all')}
              >
                الكل
              </button>
              <button
                className={`px-3 py-2 rounded-lg ${filter === 'online' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                onClick={() => setFilter('online')}
              >
                متصل
              </button>
              <button
                className={`px-3 py-2 rounded-lg ${filter === 'offline' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
                onClick={() => setFilter('offline')}
              >
                غير متصل
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النوع</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">البطارية</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">آخر اتصال</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الموقع</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDevices.map((device) => (
                <tr key={device.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {device.type === 'mobile' ? (
                        <FaMobile className="text-blue-500 mr-2" />
                      ) : device.type === 'tablet' ? (
                        <FaTabletAlt className="text-purple-500 mr-2" />
                      ) : (
                        <FaDesktop className="text-gray-500 mr-2" />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{device.name}</div>
                        <div className="text-sm text-gray-500">{device.ip}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {device.type === 'mobile' ? 'جوال' : device.type === 'tablet' ? 'جهاز لوحي' : 'كمبيوتر'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {device.status === 'online' ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        متصل
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        غير متصل
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-24 bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${device.battery > 50 ? 'bg-green-600' : device.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${device.battery}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{device.battery}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.lastSeen}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center justify-end relative">
                      <button
                        onClick={() => executeCommand(device.id, 'بدء جلسة')}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        تحكم
                      </button>
                      <button
                        onClick={() => executeCommand(device.id, 'مراقبة')}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        مراقبة
                      </button>
                      <button
                        onClick={() => executeCommand(device.id, 'تحميل ملفات')}
                        className="text-purple-600 hover:text-purple-900 mr-3"
                      >
                        تحميل
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => toggleDeviceMenu(device.id)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <FaEllipsisV />
                        </button>
                        <DeviceAdvancedMenu
                          deviceId={device.id}
                          isOpen={openDeviceMenu === device.id}
                          onClose={() => setOpenDeviceMenu(null)}
                          onCommand={executeAdvancedCommand}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* النشاط الأخير */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">النشاط الأخير</h2>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className={`p-2 rounded-full mr-3 ${
                  activity.status === 'success' ? 'bg-green-100 text-green-600' :
                  activity.status === 'error' ? 'bg-red-100 text-red-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  {activity.status === 'success' ? (
                    <FaCheckCircle />
                  ) : activity.status === 'error' ? (
                    <FaExclamationCircle />
                  ) : (
                    <FaInfoCircle />
                  )}
                </div>
                <div>
                  <div className="font-medium">{activity.device}</div>
                  <div className="text-sm text-gray-500">{activity.action}</div>
                </div>
              </div>
              <div className="text-sm text-gray-500">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">إحصائيات الجلسات</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sessionStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sessions" fill="#3b82f6" name="عدد الجلسات" />
              <Bar dataKey="duration" fill="#10b981" name="المدة (دقيقة)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">نوع الأجهزة</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={deviceStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {deviceStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">حالة الأجهزة</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
