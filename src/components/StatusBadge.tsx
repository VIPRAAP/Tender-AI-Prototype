import React from 'react';
import { Check, X, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'Pass' | 'Fail' | 'Review' | 'Processing' | 'Completed' | 'Draft';
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const configs = {
    Pass: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: <Check className="w-4 h-4" />,
    },
    Fail: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      icon: <X className="w-4 h-4" />,
    },
    Review: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      icon: <AlertCircle className="w-4 h-4" />,
    },
    Processing: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      icon: <AlertCircle className="w-4 h-4" />,
    },
    Completed: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: <Check className="w-4 h-4" />,
    },
    Draft: {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      icon: <AlertCircle className="w-4 h-4" />,
    },
  };

  const config = configs[status];
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${config.bg} ${config.text} ${sizeClasses[size]} rounded-full font-medium`}
    >
      {config.icon}
      {status}
    </span>
  );
};
