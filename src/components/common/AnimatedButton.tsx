import { Button, ButtonProps } from '@mui/material';
import { motion, HTMLMotionProps } from 'framer-motion';

type AnimatedButtonProps = ButtonProps & HTMLMotionProps<"button">;

const MotionButton = motion(Button as any);

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, ...props }) => {
  return (
    <MotionButton
      {...props}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </MotionButton>
  );
};