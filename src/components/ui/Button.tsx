import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "className"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  icon,
  iconPosition = 'left',
  href,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 ease-in-out cursor-pointer overflow-hidden relative";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-accent hover:from-primary-light hover:to-accent-hover text-white shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 border border-white/10",
    secondary: "bg-white text-primary hover:bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md",
    outline: "bg-transparent text-primary border-2 border-primary/20 hover:border-primary hover:bg-slate-50",
    glass: "bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.1)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ x: '-100%', opacity: 0 }}
          whileHover={{ x: '100%', opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      )}
    </>
  );

  const Component = href ? motion.a : motion.button;
  const hrefProps = href ? { href } : {};

  return (
    <Component
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...hrefProps}
      {...(props as any)}
    >
      {content}
    </Component>
  );
};
