import React from 'react';
import { 
  FaEllipsisV, FaCamera, FaMicrophone, FaVideo, FaLockOpen, FaDownload, 
  FaInfoCircle, FaCog, FaPowerOff, FaPlug, FaFolderOpen, FaFileArchive, 
  FaDesktop, FaMouse, FaKeyboard, FaTerminal, FaWifi, FaUserFriends 
} from 'react-icons/fa';

const DeviceAdvancedMenu = ({ deviceId, isOpen, onClose, onCommand }) => {
  const commands = [
    { 
      id: 'file-access', 
      icon: <FaFolderOpen className="mr-2 text-blue-500" />, 
      label: 'الدخول إلى الملفات', 
      command: 'الدخول إلى الملفات' 
    },
    { 
      id: 'zip-files', 
      icon: <FaFileArchive className="mr-2 text-yellow-500" />, 
      label: 'ضغط الملفات ZIP', 
      command: 'ضغط الملفات ZIP' 
    },
    { 
      id: 'screen-control', 
      icon: <FaDesktop className="mr-2 text-purple-500" />, 
      label: 'تحكم في الشاشة', 
      command: 'تحكم في الشاشة' 
    },
    { 
      id: 'remote-mouse', 
      icon: <FaMouse className="mr-2 text-green-500" />, 
      label: 'تحكم بالماوس', 
      command: 'تحكم بالماوس' 
    },
    { 
      id: 'remote-keyboard', 
      icon: <FaKeyboard className="mr-2 text-indigo-500" />, 
      label: 'تحكم باللوحة المفاتيح', 
      command: 'تحكم باللوحة المفاتيح' 
    },
    { 
      id: 'camera', 
      icon: <FaCamera className="mr-2 text-blue-500" />, 
      label: 'تشغيل الكاميرا', 
      command: 'تشغيل الكاميرا' 
    },
    { 
      id: 'microphone', 
      icon: <FaMicrophone className="mr-2 text-green-500" />, 
      label: 'تشغيل الميكروفون', 
      command: 'تشغيل الميكروفون' 
    },
    { 
      id: 'video', 
      icon: <FaVideo className="mr-2 text-purple-500" />, 
      label: 'تشغيل الفيديو', 
      command: 'تشغيل الفيديو' 
    },
    { 
      id: 'unlock', 
      icon: <FaLockOpen className="mr-2 text-yellow-500" />, 
      label: 'فتح قفل الجهاز', 
      command: 'فتح قفل الجهاز' 
    },
    { 
      id: 'download', 
      icon: <FaDownload className="mr-2 text-red-500" />, 
      label: 'تنزيل الملفات', 
      command: 'تنزيل الملفات' 
    },
    { 
      id: 'info', 
      icon: <FaInfoCircle className="mr-2 text-blue-500" />, 
      label: 'عرض المعلومات', 
      command: 'عرض المعلومات' 
    },
    { 
      id: 'apps', 
      icon: <FaCog className="mr-2 text-gray-500" />, 
      label: 'إدارة التطبيقات', 
      command: 'إدارة التطبيقات' 
    },
    { 
      id: 'terminal', 
      icon: <FaTerminal className="mr-2 text-gray-700" />, 
      label: 'التحكم عبر الطرفية', 
      command: 'التحكم عبر الطرفية' 
    },
    { 
      id: 'network', 
      icon: <FaWifi className="mr-2 text-green-600" />, 
      label: 'إعدادات الشبكة', 
      command: 'إعدادات الشبكة' 
    },
    { 
      id: 'users', 
      icon: <FaUserFriends className="mr-2 text-pink-500" />, 
      label: 'إدارة المستخدمين', 
      command: 'إدارة المستخدمين' 
    },
    { 
      id: 'restart', 
      icon: <FaPowerOff className="mr-2 text-red-500" />, 
      label: 'إعادة تشغيل', 
      command: 'إعادة تشغيل' 
    },
    { 
      id: 'disconnect', 
      icon: <FaPlug className="mr-2 text-red-500" />, 
      label: 'إيقاف الاتصال', 
      command: 'إيقاف الاتصال' 
    }
  ];

  const handleCommand = (command) => {
    onCommand(deviceId, command);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
      <div className="py-1 max-h-80 overflow-y-auto">
        {commands.map((cmd) => (
          <button
            key={cmd.id}
            onClick={() => handleCommand(cmd.command)}
            className={`flex items-center w-full px-4 py-2 text-sm ${
              cmd.id === 'disconnect' || cmd.id === 'restart' 
                ? 'text-red-600 hover:bg-red-50' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {cmd.icon}
            {cmd.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DeviceAdvancedMenu;