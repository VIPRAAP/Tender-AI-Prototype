import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Upload,
  ClipboardCheck,
  AlertTriangle,
  FileText,
  ScrollText,
  Settings,
  ShieldCheck,
} from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { path: '/upload', label: 'Upload Tender', icon: <Upload className="w-5 h-5" /> },
  { path: '/evaluations', label: 'Evaluations', icon: <ClipboardCheck className="w-5 h-5" /> },
  { path: '/fraud-alerts', label: 'Fraud Alerts', icon: <AlertTriangle className="w-5 h-5" /> },
  { path: '/reports', label: 'Reports', icon: <FileText className="w-5 h-5" /> },
  { path: '/audit-logs', label: 'Audit Logs', icon: <ScrollText className="w-5 h-5" /> },
  { path: '/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-8 h-8 text-blue-900" />
          <div>
            <h1 className="text-xl font-bold text-blue-900">TenderIQ</h1>
            <p className="text-xs text-gray-500">AI-Powered Evaluation</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-900 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <ShieldCheck className="w-4 h-4" />
          <span>Secure Platform v1.0</span>
        </div>
      </div>
    </aside>
  );
};
