import React from 'react';
import { Button } from './Button';
import { Sparkles, PlusCircle } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No tasks found here!',
  description = 'Looks like your list is completely clear. Ready to conquer some new goals?',
  actionText = 'Create a Task',
  onAction,
  icon,
}) => {
  return (
    <div className="bg-white rounded-2xl neo-border neo-shadow p-8 sm:p-12 text-center max-w-lg mx-auto my-8">
      {/* Visual Badge / Icon */}
      <div className="relative inline-block mb-5">
        <div className="w-16 h-16 bg-[#fde047] text-black rounded-2xl neo-border neo-shadow-sm flex items-center justify-center mx-auto tilt-left">
          {icon || <Sparkles className="w-8 h-8 stroke-[2.5]" />}
        </div>
        <span className="absolute -top-2 -right-3 px-2 py-0.5 bg-[#f43f5e] text-white text-[10px] font-black rounded-md neo-border-sm tilt-right">
          Empty
        </span>
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-black mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-sm font-medium text-zinc-600 mb-6 max-w-sm mx-auto">
        {description}
      </p>

      {onAction && (
        <Button
          variant="lime"
          size="md"
          onClick={onAction}
          leftIcon={<PlusCircle className="w-4 h-4 stroke-[2.5]" />}
        >
          {actionText}
        </Button>
      )}
    </div>
  );
};
