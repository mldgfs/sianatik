import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ApkBuilder from './components/ApkBuilder';
import ApkInjector from './components/ApkInjector';
import JavaInjector from './components/JavaInjector';
import ControlPanel from './components/ControlPanel';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div dir="rtl" className="flex h-screen bg-gray-100 font-arabic">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto p-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'apk-builder' && <ApkBuilder />}
        {activeTab === 'apk-injector' && <ApkInjector />}
        {activeTab === 'java-injector' && <JavaInjector />}
        {activeTab === 'control-panel' && <ControlPanel />}
      </main>
    </div>
  );
}

export default App;
