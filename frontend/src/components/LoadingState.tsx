import React from 'react';

interface LoadingStateProps {
  message?: string;
  count?: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading tasks...',
  count = 3,
}) => {
  return (
    <div className="space-y-4 my-6">
      <div className="flex items-center justify-center gap-2 py-3 text-sm font-black text-zinc-600">
        <span className="w-3.5 h-3.5 rounded-full bg-[#7c3aed] animate-ping" />
        <span>{message}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl neo-border neo-shadow p-5 animate-pulse space-y-3"
          >
            <div className="flex justify-between items-center">
              <div className="w-16 h-5 bg-zinc-200 rounded-md neo-border-sm" />
              <div className="w-14 h-5 bg-zinc-200 rounded-md neo-border-sm" />
            </div>
            <div className="w-3/4 h-6 bg-zinc-200 rounded-lg" />
            <div className="w-full h-4 bg-zinc-100 rounded" />
            <div className="w-1/2 h-4 bg-zinc-100 rounded" />
            <div className="pt-3 border-t border-black/10 flex justify-between items-center">
              <div className="w-24 h-4 bg-zinc-200 rounded" />
              <div className="w-16 h-7 bg-zinc-200 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
