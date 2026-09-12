import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  accentColor?: 'purple' | 'lime' | 'pink' | 'cyan' | 'yellow';
  progress?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  accentColor = 'purple',
  progress,
}) => {
  const accentStyles = {
    purple: 'bg-[#7c3aed] text-white',
    lime: 'bg-[#a3e635] text-black',
    pink: 'bg-[#f43f5e] text-white',
    cyan: 'bg-[#06b6d4] text-black',
    yellow: 'bg-[#fde047] text-black',
  }[accentColor];

  return (
    <div className="bg-white rounded-2xl neo-border neo-shadow p-5 flex flex-col justify-between relative overflow-hidden group neo-card-hover">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-zinc-500 mb-1">{title}</p>
          <h3 className="text-3xl sm:text-4xl font-black text-black tracking-tight">{value}</h3>
        </div>
        <div
          className={`w-12 h-12 rounded-xl neo-border-sm neo-shadow-sm flex items-center justify-center shrink-0 ${accentStyles}`}
        >
          {icon}
        </div>
      </div>

      {/* Progress Bar (Optional) */}
      {typeof progress === 'number' && (
        <div className="mt-4">
          <div className="w-full bg-zinc-100 h-3 rounded-full neo-border-sm overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                accentColor === 'purple' ? 'bg-[#7c3aed]' : accentColor === 'lime' ? 'bg-[#84cc16]' : 'bg-[#06b6d4]'
              }`}
              style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-1 text-[11px] font-bold text-zinc-600">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
        </div>
      )}

      {/* Subtitle / Microcopy */}
      {subtitle && (
        <p className="mt-3 text-xs font-semibold text-zinc-600 border-t border-black/10 pt-2.5">
          {subtitle}
        </p>
      )}
    </div>
  );
};
