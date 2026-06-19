import React from 'react';
import { motion } from 'motion/react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  title, 
  subtitle, 
  alignment = 'center',
  light = false
}) => {
  return (
    <div className={`mb-12 ${alignment === 'center' ? 'text-center' : 'text-left'}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight ${light ? 'text-white' : 'text-primary-dark'}`}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-lg md:text-xl max-w-2xl ${alignment === 'center' ? 'mx-auto' : ''} ${light ? 'text-slate-300' : 'text-slate-600'}`}
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`h-1.5 w-24 rounded-full mt-6 ${alignment === 'center' ? 'mx-auto' : ''} ${light ? 'bg-accent-light' : 'bg-accent'}`}
        style={{ originX: alignment === 'center' ? 0.5 : 0 }}
      />
    </div>
  );
};
