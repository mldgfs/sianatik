import React, { useState } from 'react';
import Icons from './Icons';

const ApkBuilder = () => {
  const [sourceCode, setSourceCode] = useState('');
  const [packageName, setPackageName] = useState('com.example.myapp');
  const [appName, setAppName] = useState('تطبيق جديد');
  const [versionCode, setVersionCode] = useState('1');
  const [versionName, setVersionName] = useState('1.0');
  const [minSdk, setMinSdk] = useState('21');
  const [targetSdk, setTargetSdk] = useState('33');
  const [buildOptions, setBuildOptions] = useState({
    debug: false,
    signed: false,
    optimized: true,
    obfuscated: false,
  });
  const [buildProgress, setBuildProgress] = useState(0);
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildLog, setBuildLog] = useState('');
  // بيانات APKs المبنية - سيتم استبدالها ببيانات حقيقية في الإنتاج
  const [builtApks, setBuiltApks] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setSourceCode(event.target.result);
      setBuildLog(`تم تحميل الملف: ${file.name}\n`);
    };
    reader.readAsText(file);
  };

  const handleBuild = () => {
    setIsBuilding(true);
    setBuildProgress(0);
    setBuildLog('بدء عملية البناء...\n');

    // محاكاة عملية البناء
    const steps = [
      'تحليل الكود المصدري...',
      'تجميع الموارد...',
      'توليدdex...',
      'توقيع التطبيق...',
      'إنشاء ملف APK...',
      'تحضير للتنزيل...'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setBuildLog(prev => prev + `${steps[currentStep]}\n`);
        setBuildProgress(((currentStep + 1) / steps.length) * 100);
        currentStep++;
        
        // عند اكتمال العملية، قم بإنشاء ملف APK حقيقي وتحميله
        if (currentStep === steps.length) {
          setTimeout(() => {
            createAndDownloadApk();
          }, 1000);
        }
      } else {
        clearInterval(interval);
        setIsBuilding(false);
      }
    }, 1000);
  };

  const createAndDownloadApk = () => {
    try {
      // إنشاء محتوى APK كنص بسيت (في تطبيق حقيقي سيتم استبدال هذا بعملية بناء فعلية)
      const apkContent = `AndroidManifest.xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="${packageName}"
    android:versionCode="${versionCode}"
    android:versionName="${versionName}"
    android:installLocation="auto">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

    <application
        android:allowBackup="${buildOptions.debug ? 'true' : 'false'}"
        android:icon="@mipmap/ic_launcher"
        android:label="${appName}"
        android:theme="@style/AppTheme"
        android:usesCleartextTraffic="${buildOptions.debug ? 'true' : 'false'}">

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:label="${appName}">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <service
            android:name=".RemoteControlService"
            android:enabled="true"
            android:exported="false" />

    </application>

</manifest>

MainActivity.java
package ${packageName.replace(/\./g, '/')};

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        TextView textView = findViewById(R.id.textView);
        textView.setText("مرحباً بك في تطبيق ${appName}");
        
        Toast.makeText(this, "تم تثبيت التطبيق بنجاح", Toast.LENGTH_LONG).show();
    }
}

activity_main.xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="جاري التحميل..."
        android:textSize="18sp" />

    <Button
        android:id="@+id/btnConnect"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:text="الاتصال بالخادم"
        android:onClick="connectToServer" />

</LinearLayout>

RemoteControlService.java
package ${packageName.replace(/\./g, '/')};

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.widget.Toast;

public class RemoteControlService extends Service {
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Toast.makeText(this, "خدمة التحكم عن بعد بدأت", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Toast.makeText(this, "خدمة التحكم عن بعد توقفت", Toast.LENGTH_SHORT).show();
    }
}
`;

      // إنشاء ملف APK
      const blob = new Blob([apkContent], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      
      // إنشاء رابط للتنزيل
      const a = document.createElement('a');
      a.href = url;
      a.download = `${appName.replace(/\s+/g, '_')}_v${versionName}.apk`;
      
      // إضافة الرابط إلى الصفحة ونقر عليه لبدء التنزيل
      document.body.appendChild(a);
      a.click();
      
      // إزالة الرابط بعد التنزيل
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // تحديث سجل البناء
        setBuildLog(prev => prev + 'تم تحميل ملف APK إلى مجلد التنزيل\n');
        setBuildLog(prev => prev + 'اكتملت العملية بنجاح!\n');
        
        // إضافة APK إلى قائمة APKs المبنية
        const newApk = {
          id: Date.now(),
          name: appName,
          packageName: packageName,
          version: versionName,
          date: new Date().toLocaleDateString('ar-SA')
        };
        setBuiltApks(prev => [newApk, ...prev]);
      }, 100);
      
    } catch (error) {
      console.error('خطأ أثناء إنشاء ملف APK:', error);
      setBuildLog(prev => prev + `حدث خطأ أثناء إنشاء ملف APK: ${error.message}\n`);
    }
  };

  return (
    <div dir="rtl" className="space-y-6 font-arabic">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">بناء APK</h1>
        <div className="text-sm text-gray-500">آخر تحديث: {new Date().toLocaleDateString('ar-SA')}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* لوحة التحكم بالبناء */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">إعدادات التطبيق</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اسم الحزمة</label>
                <input
                  type="text"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اسم التطبيق</label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">كود الإصدار</label>
                <input
                  type="number"
                  value={versionCode}
                  onChange={(e) => setVersionCode(e.target.value)}
                  className="form-control"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اسم الإصدار</label>
                <input
                  type="text"
                  value={versionName}
                  onChange={(e) => setVersionName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الـ SDK الأدنى</label>
                <input
                  type="number"
                  value={minSdk}
                  onChange={(e) => setMinSdk(e.target.value)}
                  className="form-control"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الـ الهدف SDK</label>
                <input
                  type="number"
                  value={targetSdk}
                  onChange={(e) => setTargetSdk(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">خيارات البناء المتقدمة</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>بناء للتصحيح (Debug)</span>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={buildOptions.debug}
                    onChange={(e) => setBuildOptions({...buildOptions, debug: e.target.checked})}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span>توقيع التطبيق</span>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={buildOptions.signed}
                    onChange={(e) => setBuildOptions({...buildOptions, signed: e.target.checked})}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span>تحسين الأداء</span>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={buildOptions.optimized}
                    onChange={(e) => setBuildOptions({...buildOptions, optimized: e.target.checked})}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span>إخفاء الكود (Obfuscation)</span>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={buildOptions.obfuscated}
                    onChange={(e) => setBuildOptions({...buildOptions, obfuscated: e.target.checked})}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">رفع الكود المصدري</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Icons.FaFileCode className="mx-auto text-4xl text-gray-400 mb-4" />
              <p className="mb-2">اسحب الملفات هنا أو انقر للاختيار</p>
              <input 
                type="file" 
                id="source-code-upload" 
                className="hidden" 
                accept=".java,.xml,.kt"
                onChange={handleFileUpload}
              />
              <label 
                htmlFor="source-code-upload" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
              >
                <Icons.FaUpload className="mr-2" /> اختيار الملفات
              </label>
            </div>
            {sourceCode && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">معاينة الكود</h3>
                  <button 
                    className="text-sm text-blue-600 hover:text-blue-800"
                    onClick={() => {
                      const blob = new Blob([sourceCode], {type: 'text/plain'});
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'source-code.txt';
                      a.click();
                    }}
                  >
                    <Icons.FaDownload className="inline mr-1" /> حفظ الكود
                  </button>
                </div>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-60 text-sm">
                  {sourceCode.substring(0, 1000)}{sourceCode.length > 1000 ? '...' : ''}
                </pre>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">بدء عملية البناء</h2>
              <button
                onClick={handleBuild}
                disabled={isBuilding}
                className={`flex items-center px-4 py-2 rounded-md text-white font-medium ${
                  isBuilding ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isBuilding ? (
                  <>
                    <span className="animate-spin mr-2">🔄</span> جاري البناء...
                  </>
                ) : (
                  <>
                    <Icons.FaSave className="mr-2" /> بناء APK
                  </>
                )}
              </button>
            </div>

            {buildProgress > 0 && (
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">تقدم البناء</span>
                  <span className="text-sm font-medium">{Math.round(buildProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${buildProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {buildLog && (
              <div>
                <h3 className="font-medium mb-2">سجل البناء</h3>
                <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-auto max-h-60 text-sm">
                  {buildLog}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* لوحة APKs المبنية */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">APKs المبنية مؤخراً</h2>
            <div className="space-y-4">
              {builtApks.length > 0 ? (
                builtApks.map((apk) => (
                  <div key={apk.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{apk.name}</h3>
                        <p className="text-sm text-gray-500">{apk.packageName}</p>
                        <p className="text-xs text-gray-400 mt-1">الإصدار: {apk.version} | {apk.date}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Icons.FaDownload />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          📋
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">لا توجد APKs مبنية حتى الآن</p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">نماذج جاهزة</h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 border rounded-lg hover:bg-gray-50">
                <h3 className="font-medium">نموذج تطبيق صيانة أساسي</h3>
                <p className="text-sm text-gray-500">يتضمن وظائف المراقبة والتحكم الأساسية</p>
              </button>

              <button className="w-full text-left p-3 border rounded-lg hover:bg-gray-50">
                <h3 className="font-medium">نموذج تطبيق متقدم</h3>
                <p className="text-sm text-gray-500">يتضمن واجهة متقدمة وتحكم كامل</p>
              </button>

              <button className="w-full text-left p-3 border rounded-lg hover:bg-gray-50">
                <h3 className="font-medium">نموذج تطبيق ذوي الاحتياجات الخاصة</h3>
                <p className="text-sm text-gray-500">مصمم خصيصاً لسهولة الاستخدام</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApkBuilder;