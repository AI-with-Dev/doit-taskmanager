import React from 'react';
import { TaskPriority } from '../types/task';
import { Flame, Clock, ArrowDown } from 'lucide-react';

interface PriorityBadgeProps {
  priority: TaskPriority;
  size?: 'sm' | 'md';
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, size = 'sm' }) => {
  const config = {
    high: {
      label: 'HIGH',
      bg: 'bg-[#f43f5e] text-white',
      icon: <Flame className="w-3 h-3 stroke-[2.5]" />,
    },
    medium: {
      label: 'MEDIUM',
      bg: 'bg-[#fde047] text-black',
      icon: <Clock className="w-3 h-3 stroke-[2.5]" />,
    },
    low: {
      label: 'LOW',
      bg: 'bg-[#a7f3d0] text-black',
      icon: <ArrowDown className="w-3 h-3 stroke-[2.5]" />,
    },
  }[priority] || {
    label: priority.toUpperCase(),
    bg: 'bg-zinc-200 text-black',
    icon: null,
  };

  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span
      className={`inline-flex items-center gap-1 font-black rounded-lg neo-border-sm select-none ${sizeClass} ${config.bg}`}
    >
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
};
