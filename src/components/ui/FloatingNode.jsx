import { motion } from 'framer-motion';

export function FloatingNode({ children, className, delay = 0, yOffset = 10, duration = 3 }) {
  return (
    <motion.div
      animate={{ y: [0, -yOffset, 0] }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
