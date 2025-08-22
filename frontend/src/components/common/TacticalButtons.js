import React from 'react';
import { motion } from 'framer-motion';

export const TacticalButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon, 
  isLoading = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'btn-military',
    secondary: 'btn-military-light',
    outline: 'btn-military-outline',
    danger: 'btn-military-danger'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      className={`
        inline-flex items-center justify-center rounded-lg
        ${variants[variant]} ${sizes[size]}
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-accent-light
        ${className}
      `}
      disabled={disabled || isLoading}
      whileHover={disabled || isLoading ? {} : { scale: 1.02, y: -1 }}
      whileTap={disabled || isLoading ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
      {...props}
    >
      {isLoading ? (
        <>
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <span className="font-mono tracking-wider">PROCESSING...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 mr-2" />}
          <span className="font-tactical tracking-wide uppercase">{children}</span>
        </>
      )}
    </motion.button>
  );
};

export const CommandButton = ({ children, className = '', ...props }) => (
  <TacticalButton 
    variant="primary" 
    size="lg" 
    className={`font-military tracking-wider ${className}`}
    {...props}
  >
    {children}
  </TacticalButton>
);

export const MissionButton = ({ children, icon: Icon, className = '', ...props }) => (
  <motion.button
    className={`
      relative group px-6 py-3 bg-gradient-tactical text-desert-100 
      rounded-lg border border-military-600 shadow-military
      hover:shadow-military-lg transition-all duration-300
      font-tactical tracking-wide uppercase overflow-hidden
      ${className}
    `}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    {...props}
  >
    {/* Tactical sweep effect */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-light/20 to-transparent"
      initial={{ x: '-100%' }}
      whileHover={{ x: '100%' }}
      transition={{ duration: 0.6 }}
    />
    
    <div className="relative flex items-center justify-center">
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </div>
  </motion.button>
);

export const AlertButton = ({ children, level = 'warning', className = '', ...props }) => {
  const levels = {
    info: 'bg-military-700 text-desert-100 border-military-600',
    warning: 'bg-desert-700 text-military-100 border-desert-600',
    danger: 'bg-red-800 text-desert-100 border-red-700',
    success: 'bg-olive-700 text-desert-100 border-olive-600'
  };

  return (
    <motion.button
      className={`
        inline-flex items-center px-3 py-1.5 rounded-md text-xs
        font-mono font-bold tracking-widest uppercase border
        hover:opacity-90 transition-opacity duration-200
        ${levels[level]} ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const TacticalButtonComponents = {
  TacticalButton,
  CommandButton, 
  MissionButton,
  AlertButton
};

export default TacticalButtonComponents;
