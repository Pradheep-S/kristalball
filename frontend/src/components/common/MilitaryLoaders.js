import React from 'react';
import { motion } from 'framer-motion';

export const MilitaryLoader = ({ size = "md", message = "LOADING..." }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16", 
    lg: "w-24 h-24"
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        {/* Outer rotating ring */}
        <motion.div
          className={`${sizeClasses[size]} border-4 border-military-600 border-t-accent-light rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner pulsing dot */}
        <motion.div
          className="absolute inset-4 bg-accent-light rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Targeting lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-full h-0.5 bg-accent-light/50"
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-0.5 h-full bg-accent-light/50"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
        </div>
      </div>
      
      {message && (
        <motion.p 
          className="text-sm font-mono font-bold tracking-widest text-accent-light uppercase"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export const TacticalSpinner = ({ className = "" }) => {
  return (
    <div className={`inline-block ${className}`}>
      <motion.div
        className="w-6 h-6 border-2 border-accent-light border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export const RadarLoader = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32"
  };

  return (
    <div className={`relative ${sizeClasses[size]} mx-auto`}>
      {/* Radar circles */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border border-accent-light/30 rounded-full"
          animate={{ 
            scale: [0.3, 1],
            opacity: [1, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Rotating sweep line */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-0.5 h-1/2 bg-accent-light origin-bottom" />
      </motion.div>
      
      {/* Center dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1 h-1 bg-accent-light rounded-full" />
      </div>
    </div>
  );
};

const MilitaryLoaderComponents = { MilitaryLoader, TacticalSpinner, RadarLoader };
export default MilitaryLoaderComponents;
