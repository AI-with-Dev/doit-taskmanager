import React from 'react';

export type ButtonVariant = 'primary' | 'lime' | 'pink' | 'cyan' | 'white' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs font-bold gap-1.5',
    md: 'px-4 py-2 text-sm font-black tracking-wide gap-2',
    lg: 'px-6 py-3 text-base font-black tracking-wide gap-2.5',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-[#7c3aed] text-white hover:bg-[#6d28d9]',
    lime: 'bg-[#a3e635] text-black hover:bg-[#84cc16]',
    pink: 'bg-[#f43f5e] text-white hover:bg-[#e11d48]',
    cyan: 'bg-[#06b6d4] text-black hover:bg-[#0891b2]',
    white: 'bg-white text-black hover:bg-zinc-50',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    ghost: 'bg-transparent text-black hover:bg-black/5 !border-transparent !shadow-none hover:!shadow-none',
  };

  const isGhost = variant === 'ghost';

  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center rounded-xl font-bold cursor-pointer select-none
        ${!isGhost ? 'neo-border neo-shadow neo-btn' : ''}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${disabled || isLoading ? 'opacity-60 cursor-not-allowed !transform-none !shadow-neo-sm' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
