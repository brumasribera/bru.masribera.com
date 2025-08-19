import React from 'react';
import { cn } from './utils';

interface ResponsiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function ResponsiveButton({ 
  children, 
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className,
  ...props 
}: ResponsiveButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 focus:ring-green-500 shadow-lg hover:shadow-xl active:scale-[0.98]',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  };

  const sizeClasses = {
    sm: 'py-2 px-3 text-sm',
    md: 'py-3 md:py-4 px-4 md:px-6 text-sm md:text-base',
    lg: 'py-4 md:py-5 lg:py-6 px-6 md:px-8 lg:px-10 text-base md:text-lg lg:text-xl',
  };

  const widthClasses = fullWidth ? 'w-full' : '';

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        widthClasses,
        className
      )}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="mr-2 flex-shrink-0">
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2 flex-shrink-0">
          {icon}
        </span>
      )}
    </button>
  );
}

// Responsive icon button component
interface ResponsiveIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
}

export function ResponsiveIconButton({ 
  icon, 
  size = 'md',
  variant = 'primary',
  className,
  ...props 
}: ResponsiveIconButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-white/90 hover:bg-gray-100/95 text-gray-700 shadow-md hover:shadow-lg backdrop-blur-sm border border-gray-200/50',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    outline: 'border-2 border-gray-300 text-gray-700 hover:border-gray-400',
    ghost: 'text-gray-700 hover:bg-gray-100',
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 md:w-12 md:h-12',
    lg: 'w-12 h-12 md:w-14 md:h-14',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5 md:w-6 md:h-6',
    lg: 'w-6 h-6 md:w-7 md:h-7',
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <span className={iconSizeClasses[size]}>
        {icon}
      </span>
    </button>
  );
}
