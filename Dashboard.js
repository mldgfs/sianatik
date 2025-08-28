import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const Dashboard = () => {
  // بيانات APKs - سيتم استبدالها ببيانات حقيقية في الإنتاج
  const [apkStats, setApkStats] = useState([
    { name: 'يناير', built: 12, injected: 8 },
    { name: 'فبراير', built: 15, injected: 10 },
    { name: 'مارس', built: 18, injected: 14 },
    { name: 'أبريل', built: 22, injected: 17 },
    { name: 'مايو', built: 25, injected: 20 },
  ]);

  // بيانات الأجهزة - سيتم استبدالها ببيانات حقيقية في الإنتاج
  const [deviceStats, setDeviceStats] = useState([
    { name: 'جوالات', value: 65 },
    { name: 'أجهزة لوحية', value: 20 },
    { name: 'أجهزة كمبيوتر', value: 15 },
  ]);

  // بيانات الحالة - سيتم استبدالها ببيانات حقيقية في الإنتاج
  const [statusStats, setStatusStats] = useState([
    { name: 'نشط', value: 75 },
    { name: 'غير نشط', value: 25 },
  ]);

  // بيانات الجلسات - سيتم استبدالها ببيانات حقيقية في الإنتاج
  const [sessions, setSessions] = useState([
    { id: 1, device: 'Samsung S21', user: 'أحمد محمد', status: 'active', duration: '1:25:30', time: 'الآن' },
    { id: 2, device: 'iPhone 13', user: 'فاطمة علي', status: 'active', duration: '0:45:12', time: 'منذ 5 دقائق' },
    { id: 3, device: 'Xiaomi 12', user: 'محمد سالم', status: 'ended', duration: '2:15:45', time: 'منذ ساعة' },
  ]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div dir="rtl" className="space-y-6 font-arabic">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">لوحة التحكم</h1>
        <div className="text-sm text-gray-500">آخر تحديث: {new Date().toLocaleDateString('ar-SA')}</div>
      </div>

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">إجمالي APKs</p>
              <p className="text-3xl font-bold mt-2">{apkStats.reduce((sum, stat) => sum + stat.built + stat.injected, 0)}</p>
              <p className="text-green-500 text-sm mt-1">+12% هذا الشهر</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <span className="text-blue-600 text-2xl">📦</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">الأجهزة المتصلة</p>
              <p className="text-3xl font-bold mt-2">{deviceStats.reduce((sum, stat) => sum + stat.value, 0)}</p>
              <p className="text-green-500 text-sm mt-1">+5% هذا اليوم</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <span className="text-green-600 text-2xl">📱</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">الجلسات النشطة</p>
              <p className="text-3xl font-bold mt-2">{sessions.filter(s => s.status === 'active').length}</p>
              <p className="text-red-500 text-sm mt-1">-3% اليوم</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <span className="text-yellow-600 text-2xl">🔄</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">المشاكل المنفذة</p>
              <p className="text-3xl font-bold mt-2">156</p>
              <p className="text-green-500 text-sm mt-1">+22% هذا الشهر</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <span className="text-purple-600 text-2xl">✅</span>
            </div>
          </div>
        </div>
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">إحصائيات APKs</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={apkStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="built" fill="#3b82f6" name="تم إنشاؤها" />
              <Bar dataKey="injected" fill="#10b981" name="تم حقنها" />
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
            <h2 className="text-xl font-bold mb-4">حالة الجلسات</h2>
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

      {/* الجلسات الأخيرة */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">الجلسات الأخيرة</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">جهاز</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المستخدم</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">مدة الجلسة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الوقت</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sessions.map((session) => (
                <tr key={session.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{session.device}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{session.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      session.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {session.status === 'active' ? 'نشط' : 'منتهية'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{session.duration}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{session.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;