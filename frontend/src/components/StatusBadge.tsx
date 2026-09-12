import React from 'react';
import { TaskStatus } from '../types/task';
import { CheckCircle2, CircleDashed } from 'lucide-react';

interface StatusBadgeProps {
  status: TaskStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
  const isCompleted = status === 'completed';
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm';

  return (
    <span
      className={`inline-flex items-center gap-1 font-black rounded-lg neo-border-sm select-none ${sizeClass} ${
        isCompleted
          ? 'bg-[#a3e635] text-black shadow-none'
          : 'bg-[#fed7aa] text-black shadow-none'
      }`}
    >
      {isCompleted ? (
        <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
      ) : (
        <CircleDashed className="w-3 h-3 stroke-[2.5]" />
      )}
      <span>{isCompleted ? 'DONE' : 'PENDING'}</span>
    </span>
  );
};
