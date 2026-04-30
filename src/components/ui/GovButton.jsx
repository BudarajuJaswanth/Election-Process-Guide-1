import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export function GovButton({ children, className, onClick, variant = 'primary', ...props }) {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 font-bold rounded transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-gov-blue/50";
  
  const variants = {
    primary: "bg-gov-blue text-white hover:bg-gov-navy",
    secondary: "bg-white text-gov-blue border-2 border-gov-blue hover:bg-gov-bg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
