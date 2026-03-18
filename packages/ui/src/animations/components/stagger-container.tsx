'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { useStaggerReveal } from '../hooks/use-stagger-reveal';

interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  stagger?: number;
  delay?: number;
  children: React.ReactNode;
}

const StaggerContainer = React.forwardRef<HTMLDivElement, StaggerContainerProps>(
  ({ stagger, delay, children, ...props }, ref) => {
    const { containerVariants, childVariants } = useStaggerReveal({
      stagger,
      delay,
    });

    return (
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;

          return (
            <motion.div variants={childVariants}>
              {child}
            </motion.div>
          );
        })}
      </motion.div>
    );
  },
);
StaggerContainer.displayName = 'StaggerContainer';

export { StaggerContainer, type StaggerContainerProps };
