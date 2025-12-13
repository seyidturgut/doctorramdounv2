import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white' | 'ghost' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  // Base: Tactile feedback, smooth transition, modern roundedness
  const baseStyles = "relative overflow-hidden inline-flex items-center justify-center font-bold transition-all duration-300 ease-out rounded-xl focus:outline-none focus:ring-4 focus:ring-medical-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] tracking-wide hover:-translate-y-1";

  const variants = {
    primary: "bg-medical-secondary text-white hover:brightness-110 shadow-lg shadow-medical-secondary/20 hover:shadow-glow border border-transparent",
    secondary: "bg-medical-primary text-white hover:brightness-125 shadow-lg shadow-medical-primary/20 hover:shadow-xl border border-transparent",
    outline: "border-2 border-medical-primary/10 text-medical-primary bg-transparent hover:border-medical-primary hover:bg-white hover:shadow-soft",
    white: "bg-white text-medical-primary hover:text-medical-secondary shadow-soft hover:shadow-hover border border-gray-50",
    ghost: "bg-transparent text-medical-primary hover:bg-medical-light/50 hover:translate-y-0 shadow-none",
    link: "bg-transparent text-medical-secondary hover:text-teal-700 underline-offset-4 hover:underline p-0 h-auto min-h-0 active:scale-100 shadow-none hover:translate-y-0",
  };

  const sizes = {
    xs: "px-3 py-1.5 text-xs md:text-sm min-h-[32px]",
    sm: "px-5 py-2.5 text-sm md:text-base min-h-[44px]",
    md: "px-7 py-3.5 text-base md:text-lg min-h-[54px]",
    lg: "px-10 py-4.5 text-lg md:text-xl min-h-[64px]",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {/* Subtle shine effect wrapper */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};